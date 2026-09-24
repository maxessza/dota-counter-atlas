import json
from pathlib import Path
root=Path(__file__).resolve().parent
raw=(root/'data.js').read_text(encoding='utf-8-sig')
heroes=json.loads(raw[raw.index('['):].rstrip().rstrip(';'))
sources=json.loads((root/'research/expanded/sources.json').read_text(encoding='utf-8'))
byname={s['name']:s for s in sources}
known={h['name'] for h in heroes}
pending=[]
for h in heroes:
    have={c[0] for c in h['counters']}
    pairs=[]
    for p in byname[h['name']].get('pairs',[]):
        name=p['name'].replace('Outworld Devourer','Outworld Destroyer')
        if not name or name in have:continue
        assert name in known,(h['name'],name)
        pairs.append({'name':name,'reason':p['reason']})
        have.add(name)
        if len(have)>=5:break
    pending.append({'name':h['name'],'pairs':pairs})
(root/'research/pending.json').write_text(json.dumps(pending,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'research/before-five.json').write_text(json.dumps(heroes,ensure_ascii=False,indent=2),encoding='utf-8')
print(len(pending),sum(len(h['pairs']) for h in pending))

