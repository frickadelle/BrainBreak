# Historical voting-interface browser test. It does not support the current guided mix.
# Current browser acceptance uses CUA; transport acceptance uses guided-test.mjs.
# Uses three isolated contexts in an existing Chrome instance. No fake timers.
# Static maintenance does not count as an executed browser acceptance test.
import json
import math
import subprocess
import os
import time
from pathlib import Path

# Read the authored server content locally, never through a public answer endpoint.
# The observed question ID selects the answer after adaptive server selection.
content_loader = r"""
import fs from 'node:fs';
import ts from 'typescript';
const cache = new Map();
function compile(file) {
    if (cache.has(file)) return cache.get(file);
    let source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
        compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
    }).outputText;
    source = source.replace(/from\s+(['"])(\.[^'"]+)\1/g, (_, quote, path) => {
        const resolved = new URL(path + '.ts', new URL(file, 'file://' + process.cwd() + '/')).pathname;
        return 'from ' + JSON.stringify(compile(resolved));
    });
    const url = 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
    cache.set(file, url);
    return url;
}
const {packages} = await import(compile('worker/content/index.ts'));
console.log(JSON.stringify(packages));
"""
packages = json.loads(subprocess.check_output(
    ['node', '--input-type=module', '-e', content_loader], text=True
))


def estimate_input(value, lang, grouped=False):
    formatted = format(value, ',.6f' if grouped else '.6f').rstrip('0').rstrip('.')
    if lang == 'de':
        formatted = formatted.replace(',', '_').replace('.', ',').replace('_', '.')
    return formatted


def estimate_points(reference, answer):
    relative_error = abs(answer - reference) / max(abs(reference), 1)
    return math.floor(1000 * max(0, 1 - relative_error) + 0.5)


base = os.environ.get('BRAINBREAK_URL', 'http://127.0.0.1:8787')
out = Path('test-results').resolve()
out.mkdir(exist_ok=True)
observer = """(() => { const Native=window.WebSocket; window.__bb={states:[],errors:[]}; window.WebSocket=class extends Native { constructor(...args){super(...args);window.__bb.socket=this;this.addEventListener('message',e=>{try{const m=JSON.parse(e.data);if(m.type==='state'){window.__bb.state=m.state;window.__bb.states.push(m.state);}if(m.type==='error')window.__bb.errors.push(m.code);}catch{}});}}; })();"""

def wait_for(fn, timeout=15):
    deadline=time.time()+timeout
    while True:
        value=fn()
        if value:return value
        if time.time()>deadline:raise AssertionError('Timed out waiting for browser state')
        time.sleep(.15)

def evaluate(player, expression):
    return js(expression, target_id=player['target'])

def state(player):
    return evaluate(player,'window.__bb && window.__bb.state || null')

def input_value(player, selector, value):
    evaluate(player,"(()=>{const e=document.querySelector("+json.dumps(selector)+");Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,"+json.dumps(value)+");e.dispatchEvent(new Event('input',{bubbles:true}));})()")

def click(player, selector):
    evaluate(player,'document.querySelector('+json.dumps(selector)+').click()')

def language(player, lang):
    evaluate(player,"(()=>{const e=document.querySelector('#language');e.value="+json.dumps(lang)+";e.dispatchEvent(new Event('change',{bubbles:true}));})()")

def screenshot(player, filename):
    switch_tab(player['target'])
    capture_screenshot(str(out / filename), max_dim=1800)

voting_check=None
if os.environ.get('BRAINBREAK_RESUME')=='1':
    players=json.load(open('/tmp/brainbreak-browser-players.json'))
    code=state(players[0])['code']
else:
    players=[]
    for i,lang in enumerate(['de','en','de']):
        context=cdp('Target.createBrowserContext',disposeOnDetach=False)['browserContextId']
        target=cdp('Target.createTarget',url='about:blank',browserContextId=context)['targetId']
        sid=switch_tab(target)
        cdp('Page.addScriptToEvaluateOnNewDocument',session_id=sid,source=observer)
        cdp('Emulation.setDeviceMetricsOverride',session_id=sid,width=1280,height=900,deviceScaleFactor=1,mobile=False)
        goto_url(base)
        wait_for_load()
        player={'context':context,'target':target,'language':lang}
        wait_for(lambda: evaluate(player,"!!document.querySelector('#player-name')"))
        language(player,lang)
        players.append(player)
    screenshot(players[0],'home-desktop.png')
    input_value(players[0],'#player-name','QA Browser DE')
    click(players[0],'.entry-submit')
    code=wait_for(lambda: state(players[0]))['code']
    for i in [1,2]:
        switch_tab(players[i]['target'])
        goto_url(base+'/room/'+code)
        wait_for_load()
        wait_for(lambda: evaluate(players[i],"!!document.querySelector('#player-name')"))
        input_value(players[i],'#player-name','QA Browser EN' if i==1 else 'QA Browser DE')
        click(players[i],'.entry-submit')
        wait_for(lambda: state(players[i]))
    wait_for(lambda: len([p for p in state(players[0])['players'] if p['connected']])==3)
    screenshot(players[0],'lobby.png')
    click(players[0],'.start-button')
    wait_for(lambda: state(players[0])['phase']=='voting')
    screenshot(players[0],'voting.png')
    voting_deadline=state(players[0])['endsAt']
    # Hold the final vote so voting privacy and the unchanged deadline remain observable.
    for p in players[:2]: click(p,'.vote-estimate')
    wait_for(lambda: all(state(p)['phase']=='voting' and state(p)['votes']['estimate']==2 for p in players))
    assert all(state(p)['endsAt']==voting_deadline for p in players)
    click(players[2],'.vote-estimate')
    wait_for(lambda: all(state(p)['phase']=='question' and state(p)['round']==0 for p in players),15)
    selected=[state(p) for p in players]
    assert all(s['category']=='estimate' and s['votes']['estimate']==3 for s in selected)
    assert len(set(s['endsAt'] for s in selected))==1
    assert selected[0]['endsAt'] < voting_deadline + 45000
    voting_check={'votes':3,'votingEndsAt':voting_deadline,'questionEndsAt':selected[0]['endsAt'],'startedEarly':True}

identities=[state(p)['me']['id'] for p in players]
assert len(set(identities))==3
pack = next((p for p in packages if p['id'] == state(players[0])['pack']['id']), None)
assert pack is not None, 'The tested deployment must have a matching local content pack'
questions = {question['id']: question for question in pack['questions']['estimate']}
checks=[]
expected_scores=[0,0,0]
for round_index in range(state(players[0])['totalRounds']):
    wait_for(lambda: all(state(p)['phase']=='question' and state(p)['round']==round_index for p in players),65)
    current=[state(p) for p in players]
    question_id=current[0]['question']['id']
    assert question_id in questions, 'The observed adaptive question is missing from local content'
    target=questions[question_id]['answer']
    assert isinstance(target,(int,float)) and target > 0
    submitted=[target,round(target*1.1,6),round(target*.5,6)]
    deadline=current[0]['endsAt']
    assert all(s['endsAt']==deadline for s in current)
    assert len(set(s['question']['id'] for s in current))==1
    assert current[0]['question']['prompt']!=current[1]['question']['prompt'] if round_index==0 else True
    assert all('answer' not in s['question'] and 'reveal' not in s for s in current)
    assert all('answer' not in p for p in current[0]['players'])
    if round_index==0:
        screenshot(players[0],'question-de.png')
        screenshot(players[1],'question-en.png')
        # Type German formatting (with grouping when applicable), then switch before submitting. The number must keep its meaning.
        input_value(players[0],'#estimate',estimate_input(submitted[0],'de',grouped=True))
        language(players[0],'en')
        wait_for(lambda: state(players[0])['question']['prompt']==current[1]['question']['prompt'])
        assert state(players[0])['endsAt']==deadline
    else:
        input_value(players[0],'#estimate',estimate_input(submitted[0],'de'))
    click(players[0],'.submit-row button')
    # Hold player 1's answer until all question-phase privacy and reload checks finish.
    input_value(players[2],'#estimate',estimate_input(submitted[2],'de'))
    click(players[2],'.submit-row button')
    wait_for(lambda: 'answer' in state(players[0])['me'] and 'answer' in state(players[2])['me'])
    assert state(players[0])['me']['answer']==submitted[0]
    assert state(players[0])['endsAt']==deadline
    assert state(players[0])['me']['id']==identities[0]
    if round_index==0:
        # A language change after locking must not grant another answer.
        language(players[0],'de')
        wait_for(lambda: state(players[0])['question']['prompt']==current[0]['question']['prompt'])
        assert state(players[0])['me']['answer']==submitted[0]
        assert evaluate(players[0],"!!document.querySelector('#estimate').disabled")
        evaluate(players[0],"window.__bb.socket.send(JSON.stringify({type:'answer',questionId:window.__bb.state.question.id,value:'1'}))")
        wait_for(lambda: 'ALREADY_ANSWERED' in evaluate(players[0],'window.__bb.errors'))
        # Reload a locked independent session while another player still has not answered.
        switch_tab(players[2]['target']);cdp('Page.reload');wait_for_load()
        wait_for(lambda: state(players[2]) and 'answer' in state(players[2])['me'])
        assert state(players[2])['me']['id']==identities[2]
        assert state(players[2])['me']['answer']==submitted[2]
    before_last=[state(p) for p in players]
    assert all(s['phase']=='question' and s['endsAt']==deadline for s in before_last)
    assert all('answer' not in s['question'] and 'reveal' not in s for s in before_last)
    assert all('answer' not in player for s in before_last for player in s['players'])
    assert 'answer' not in before_last[1]['me']
    if round_index==1:
        # Disconnect the already-answered host before the immediate reveal and next question.
        switch_tab(players[0]['target']);goto_url('about:blank');wait_for_load()
    input_value(players[1],'#estimate',estimate_input(submitted[1],'en'))
    last_answer_at=time.time()*1000
    click(players[1],'.submit-row button')
    wait_for(lambda: state(players[1])['phase']=='reveal' and state(players[1])['round']==round_index,15)
    observed_reveal=state(players[1])
    assert observed_reveal['endsAt'] < deadline + 10000
    # The final answer starts the ten-second reveal immediately; it cannot retain the old question deadline.
    assert observed_reveal['endsAt'] <= last_answer_at + 15000
    for i,value in enumerate(submitted):
        expected_scores[i]+=estimate_points(target,value)
    for i in [1,2]:
        wait_for(lambda i=i: state(players[i])['phase']=='reveal' and state(players[i])['round']==round_index)
        assert state(players[i])['me']['score']==expected_scores[i]
    if round_index==1:
        wait_for(lambda: state(players[1])['phase']=='question' and state(players[1])['round']==2,20)
        switch_tab(players[0]['target']);goto_url(base+'/room/'+code);wait_for_load()
        wait_for(lambda: state(players[0]) and state(players[0])['round']==2)
        assert state(players[0])['me']['id']==identities[0]
        assert state(players[0])['me']['score']==expected_scores[0]
    else:
        wait_for(lambda: state(players[0])['phase']=='reveal' and state(players[0])['round']==round_index)
        assert state(players[0])['me']['score']==expected_scores[0]
    if round_index==0: screenshot(players[1],'reveal-en.png')
    if round_index==2:
        switch_tab(players[2]['target'])
        cdp('Emulation.setDeviceMetricsOverride',width=390,height=844,deviceScaleFactor=1,mobile=True)
        screenshot(players[2],'mobile-reveal.png')
        assert not evaluate(players[2],'document.documentElement.scrollWidth > innerWidth')
    checks.append({'round':round_index+1,'questionId':question_id,'questionEndsAt':deadline,'revealEndsAt':observed_reveal['endsAt'],'target':target,'submitted':submitted,'expectedScores':expected_scores[:]})
    print(json.dumps({'browserRound':round_index+1,'code':code,'verified':True}),flush=True)

wait_for(lambda: all(state(p)['phase']=='results' and not state(p).get('saving') for p in players),20)
for i,score in enumerate(expected_scores):
    s=state(players[i]);assert s['me']['score']==score
    assert next(r for r in s['weekly'] if r['id']==identities[i])['score']==score
screenshot(players[0],'results-de.png')
screenshot(players[2],'results-mobile.png')
assert not evaluate(players[2],'document.documentElement.scrollWidth > innerWidth')
report={'time':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'code':code,'playerIds':identities,'scores':expected_scores,'checks':checks,'voting':voting_check,'languages':['de','en','de'],'independentContexts':3,'mobileWidth':390,'passed':True}
(out/'browser.json').write_text(json.dumps(report,indent=2))
Path('/tmp/brainbreak-browser-players.json').write_text(json.dumps(players))
if os.environ.get('BRAINBREAK_KEEP_CONTEXTS')!='1':
    for p in players:cdp('Target.disposeBrowserContext',browserContextId=p['context'])
print('PASS: three independent browser sessions, mixed languages, early unanimous voting, six authoritative rounds with immediate completion, adaptive questions, language switch, host disconnect, reload, mobile and results',flush=True)
