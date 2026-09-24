import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
heroes=json.loads((ROOT/'research/before-five.json').read_text(encoding='utf-8'))
roster=json.loads((ROOT/'research/roster.json').read_text(encoding='utf-8'))
pending=json.loads((ROOT/'research/pending.json').read_text(encoding='utf-8'))
byhero={h['name']:h for h in heroes}
summary={}
for number,line in enumerate((ROOT/'expansion-th.txt').read_text(encoding='utf-8-sig').splitlines(),1):
    if not line.strip(): continue
    fields=line.split('|')
    if len(fields)<2 or len(fields)>4:
        raise ValueError(f'expansion-th.txt:{number}: expected one to three reasons for {fields[0]}')
    if fields[0] in summary:
        continue
    summary[fields[0]]=fields[1:]
known={h['name'] for h in heroes}
added=0
for h in heroes:
    name=h['name']
    existing={c[0] for c in h['counters']}
    if name=='Largo':
        h['evidence']='ข้อวิเคราะห์จากกลไก: หน้าอ้างอิงมีสถิติคู่ที่เสียเปรียบ แต่ไม่มีคำอธิบายรายฮีโร่ คู่แก้ทางทั้ง 5 และเหตุผลจึงเป็นบทวิเคราะห์ ไม่ใช่คำอธิบายจากหน้าอ้างอิง'
        h['counters']=[
          ['Riki','ข้อวิเคราะห์จากกลไก','','Smoke Screen ใบ้ในพื้นที่ จึงอาจลดการใช้สกิลของ Largo หากจับให้อยู่ในควันได้','ต้องเข้าถึงตัวและไม่ปล่อยให้ Largo เดินพ้นควัน'],
          ['Ancient Apparition','ข้อวิเคราะห์จากกลไก','','Ice Blast หยุดการฟื้นเลือด จึงรับมือส่วนฮีลของ Catchy Lick และ Island Elixir ได้เมื่อดีบัฟโดน','ไม่หยุดบัฟด้านอื่นของ Largo และต้องยิง Ice Blast ให้โดน'],
          ['Outworld Destroyer','ข้อวิเคราะห์จากกลไก','','Astral Imprisonment ใช้หลบช่วงที่ Largo พยายามประสานการโจมตี และ Arcane Orb ช่วยลงดาเมจจากระยะ','เลือกจังหวะใช้ Astral เพราะอาจยก Largo ออกจากระยะที่ทีมกำลังลงดาเมจ'],
          ['Faceless Void','ข้อวิเคราะห์จากกลไก','','Time Dilation กดคูลดาวน์ของสกิลที่ Largo เพิ่งใช้ และ Chronosphere ช่วยแยก Largo จากเพื่อน','จับให้ตรงจังหวะหลัง Largo ใช้สกิลสนับสนุน และให้ทีมอยู่ในวงอย่างปลอดภัย'],
          ['Troll Warlord','ข้อวิเคราะห์จากกลไก','','การโจมตีต่อเนื่องและ Battle Trance ช่วยสู้ในระยะประชิดระหว่างที่ Largo พยายามสนับสนุนเพื่อน','ต้องรักษาระยะเข้าถึง Largo และระวังสกิลควบคุมจากทีมศัตรู']]
        h['sourceUrl']='https://dotacoach.gg/en/heroes/counters/largo'
        h['extraSources']=['https://dotacoach.gg/en/heroes/counters/largo']
        added+=3
        continue
    if name=='Tusk':
        h['counters'].append(['Anti-Mage','','','Mana Break เผามานาที่ Tusk ต้องใช้กับสกิล และ Blink ช่วยหลบ Snowball เมื่อยังไม่ถูกจับ','เข้าถึง Tusk หลัง Snowball เริ่มแล้วเพื่อกดดันมานา'])
        extra=[
          ['Disruptor','ตัดการเซฟและคุมตำแหน่ง','ทีมไฟต์','ใช้ Kinetic Field และ Static Storm คุมตำแหน่งหลัง Tusk ใช้ Snowball ช่วยเพื่อนแล้ว','รอ Snowball หมดช่วงช่วยชีวิตก่อนวางคอมโบ'],
          ['Phantom Lancer','ร่างปลอมแบ่งเป้าหมาย','','ส่งร่างปลอมรับ Snowball หรือ Ice Shards แล้วบังคับให้ Tusk เลือกเป้าหมาย','อย่ารวมตัวจริงให้ Ice Shards ปิดทางถอยทั้งทีม']]
        h['counters'].extend(extra)
        h['sourceUrl']='https://dota2counters.com/heroes/tusk/'
        h['sourceLabel']='Dota2Counters'
        h['extraSources']=['https://dotacoach.gg/en/heroes/counters/tusk','https://dotacoach.gg/en/heroes/counters/clockwerk','https://dota2counters.com/heroes/tusk/']
        added+=2
        continue
    reasons=summary.get(name)
    candidates=next(x['pairs'] for x in pending if x['name']==name)
    need=5-len(existing)
    if reasons is None:
        raise ValueError(f'missing Thai strategy for {name}; needs {need}')
    if len(reasons)!=need:
        raise ValueError(f'{name}: need {need} reasons but found {len(reasons)}')
    chosen=[]
    for item in candidates:
        other=item['name'].replace('Outworld Devourer','Outworld Destroyer')
        if other in existing or other in {c['name'] for c in chosen}: continue
        chosen.append({'name':other,'sourceReason':item['reason']})
        if len(chosen)==need:break
    if len(chosen)!=need:
        raise ValueError(f'{name}: only found {len(chosen)} unique counters, need {need}')
    for match,reason in zip(chosen,reasons):
        h['counters'].append([match['name'],'','','วิธีแก้ทาง · '+reason,''])
        existing.add(match['name'])
        added+=1
    h['patch']=next(x['patch'] for x in json.loads((ROOT/'research/expanded/sources.json').read_text(encoding='utf-8')) if x['name']==name)
for h in heroes:
    names=[c[0] for c in h['counters']]
    if len(names)<5 or len(names)!=len(set(names)):
        raise ValueError(f'{h["name"]}: expected five unique counters; found {len(names)}')
    if any(n not in known or n==h['name'] for n in names):
        raise ValueError(f'{h["name"]}: unknown or self counter')
for h in heroes:
    if h['name']!='Largo':h.pop('evidence',None)
heroes.sort(key=lambda h:h['name'].lower())
(ROOT/'data.js').write_text('window.HEROES = '+json.dumps(heroes,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
metadata={'checked':'2026-09-24','rosterSource':'https://api.opendota.com/api/heroes','heroCount':len(heroes),'matchupCount':sum(len(h['counters']) for h in heroes),'minimumCountersPerHero':min(len(h['counters']) for h in heroes),'newMatchupsAdded':added,'sources':[{'hero':h['name'],'url':h['sourceUrl'],'extraSources':h.get('extraSources',[]),'patch':h['patch'],'evidence':h.get('evidence','กลไกอธิบายจากคำแนะนำ Dota Coach พร้อมเงื่อนไขการใช้')} for h in heroes]}
(ROOT/'sources.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Updated {len(heroes)} heroes; added {added} matchup strategies; {metadata["matchupCount"]} total, minimum {metadata["minimumCountersPerHero"]} per hero.')






