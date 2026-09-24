import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent
roster=json.loads((ROOT/'research/roster.json').read_text(encoding='utf-8'))
sources=json.loads((ROOT/'research/sources.json').read_text(encoding='utf-8'))
summary={}
for line in (ROOT/'summaries.txt').read_text(encoding='utf-8-sig').splitlines():
    if not line.strip():continue
    fields=line.split('|')
    assert len(fields)==4,fields[0]
    summary[fields[0]]=fields[1:]
old=json.loads((ROOT/'research/original-data.json').read_text(encoding='utf-8-sig'))
existing={h['name']:h for h in old}
byname={h['name']:h for h in sources}
known={h['localized_name'] for h in roster}
result=[]
for h in roster:
    name=h['localized_name']
    src=byname[name]
    slug=name.lower().replace("'",'').replace(' ','-')
    if name in existing:
        item=existing[name]
        if name=='Medusa':
            item['source']='medusa'
            item['counters'].append(['Alchemist','เร่งจังหวะเกม','ต้น–กลางเกม','Alchemist เร่งฟาร์มและไอเทมเพื่อกดดันก่อน Medusa พร้อมสู้ ทำให้พื้นที่ฟาร์มของเธอหดลง','ต้องเปลี่ยนความได้เปรียบด้านไอเทมเป็นการยึดพื้นที่ ไม่ปล่อยเกมยืดโดยไม่มีแรงกดดัน'])
        item['patch']=src['patch']
    elif name=='Largo':
        item={'id':'largo','name':name,'alias':'ลาร์โก','initial':'LA','role':'Support','patch':'7.41e (ส่วนไอเทมของแหล่งอ้างอิง)','weak':'ควรระวังการใบ้และการหยุดฟื้นฟู','evidence':'ข้อวิเคราะห์จากกลไก: แหล่งอ้างอิงระบุ Riki และ Ancient Apparition ในคู่ที่เสียเปรียบทางสถิติ แต่ไม่มีคำอธิบายรายคู่ เหตุผลด้านล่างจึงเป็นข้อวิเคราะห์ประกอบ ไม่ใช่คำอธิบายโดยตรงจากผู้จัดทำสถิติ','counters':[['Riki','ข้อวิเคราะห์จากกลไก','','Smoke Screen ใบ้ในพื้นที่ จึงมีโอกาสลดการใช้สกิลช่วยทีมของ Largo หากจับให้อยู่ในควันได้','ต้องเข้าถึงตัวและป้องกันไม่ให้เดินออกจากควันหรือใช้เครื่องมือป้องกัน'],['Ancient Apparition','ข้อวิเคราะห์จากกลไก','','Ice Blast หยุดการฟื้นเลือด จึงรับมือส่วนฮีลจาก Catchy Lick และ Island Elixir ได้เมื่อดีบัฟติดเป้าหมาย','ไม่ได้หยุดบัฟด้านอื่นทั้งหมดของ Largo และต้องยิง Ice Blast ให้โดน']]}
    else:
        weak,r1,r2=summary[name]
        pairs=src['pairs'][:2]
        assert len(pairs)==2,name
        counters=[]
        for p,reason in zip(pairs,[r1,r2]):
            cn=p['name'].replace('Outworld Devourer','Outworld Destroyer')
            assert cn in known,(name,cn)
            counters.append([cn,'','',reason,''])
        item={'id':slug,'name':name,'initial':''.join(w[0] for w in name.replace('-',' ').split())[:3].upper() if ' ' in name or '-' in name else name[:2].upper(),'alias':'','role':' / '.join(h['roles'][:2]),'patch':src['patch'],'weak':'ควรระวัง'+weak,'counters':counters}
    item['heroId']=h['id']
    item['attribute']=h['primary_attr']
    item['alias']=(item.get('alias','')+' '+h['name'].replace('npc_dota_hero_','').replace('_',' ')+' '+''.join(w[0] for w in name.replace('-',' ').split()) if len(name.replace('-',' ').split())>1 else item.get('alias','')+' '+h['name'].replace('npc_dota_hero_','').replace('_',' ')).strip()
    item['sourceUrl']='https://dotacoach.gg/en/heroes/counters/'+ ('largo' if name=='Largo' else src['slug'])
    item['checked']='2026-09-24'
    assert len(item['counters'])>=2,name
    assert all(c[0] in known and c[0]!=name and c[3] for c in item['counters']),name
    result.append(item)
result.sort(key=lambda h:h['name'].lower())
assert len(result)==len(roster)==127
assert len(set(h['id'] for h in result))==127
(ROOT/'data.js').write_text('window.HEROES = '+json.dumps(result,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
metadata={'checked':'2026-09-24','rosterSource':'https://api.opendota.com/api/heroes','heroCount':len(result),'matchupCount':sum(len(h['counters']) for h in result),'sources':[{'hero':h['name'],'url':h['sourceUrl'],'patch':h['patch'],'evidence':h.get('evidence','สรุปกลไกจากคำแนะนำ พร้อมข้อควรระวังประกอบ')} for h in result]}
(ROOT/'sources.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2),encoding='utf-8')
print('Built',len(result),'heroes;',metadata['matchupCount'],'matchups; all roster IDs covered')
