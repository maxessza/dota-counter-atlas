import urllib.request, json, re, html, time, concurrent.futures
from pathlib import Path
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'research'
OUT.mkdir(exist_ok=True)
def fetch(url):
    for attempt in range(3):
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
            with urllib.request.urlopen(req,timeout=35) as r: return r.read().decode()
        except Exception:
            if attempt==2: raise
            time.sleep(2+attempt)
def clean(s):return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
roster=json.loads(fetch('https://api.opendota.com/api/heroes'))
(OUT/'roster.json').write_text(json.dumps(roster,ensure_ascii=False,indent=2),encoding='utf-8')
def one(h):
    slug=h['localized_name'].lower().replace("'",'').replace(' ','-')
    if slug=='outworld-destroyer':slug='outworld-devourer'
    path=OUT/(slug+'.json')
    if path.exists():return json.loads(path.read_text(encoding='utf-8'))
    url='https://dotacoach.gg/en/heroes/counters/'+slug
    try:
        s=fetch(url)
        bad=s.split('Bad against...',1)[1]
        if '...based on gameplay' not in bad:
            result={'name':h['localized_name'],'slug':slug,'url':url,'patch':'not specified for gameplay','checked':'2026-09-24','pairs':[],'status':'no gameplay explanation; manual analysis required'}
            path.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
            return result
        gameplay=bad.split('...based on gameplay',1)[1].split('...counter items',1)[0]
        patch=re.search(r'\[([^\]]+)\]',gameplay).group(1)
        chunks=re.split(r'<h6[^>]*>',gameplay)[1:]
        pairs=[]
        for chunk in chunks[:3]:
            name=clean(chunk.split('</h6>',1)[0])
            ps=re.findall(r'<p\b[^>]*>(.*?)</p>',chunk,re.S)
            desc=clean(' '.join(ps))
            pairs.append({'name':name,'reason':desc})
        if not pairs:raise ValueError('no gameplay counters')
        result={'name':h['localized_name'],'slug':slug,'url':url,'patch':patch,'checked':'2026-09-24','pairs':pairs}
        path.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
        return result
    except Exception as e:return {'name':h['localized_name'],'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results=list(pool.map(one,roster))
(OUT/'sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('Roster:',len(roster),'Researched:',sum(bool(r.get('pairs')) for r in results))
print(json.dumps([r for r in results if 'error' in r]))

