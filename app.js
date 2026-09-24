const heroes = window.HEROES;
const search = document.querySelector('#search');
const attribute = document.querySelector('#attribute');
const list = document.querySelector('#heroes');
const detail = document.querySelector('#detail');
const byId = new Map(heroes.map(h => [h.id, h]));
const byName = new Map(heroes.map(h => [h.name, h]));
const attrNames = {str:'Strength',agi:'Agility',int:'Intelligence',all:'Universal'};
const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = text => String(text).toLowerCase().replace(/[\s'’_-]+/g, '');
let selected = byId.get(location.hash.slice(1)) || byId.get('sniper') || heroes[0];
const matchups = heroes.reduce((total,h) => total + h.counters.length, 0);
document.querySelector('#hero-total').textContent = heroes.length;
document.querySelector('.scope').textContent = `ครบ ${heroes.length} ฮีโร่ตามรายชื่อที่ตรวจ • ${matchups} คู่แก้ทาง`;
function renderList() {
 const q = normalize(search.value.trim());
 const found = heroes.filter(h => (!attribute.value || h.attribute === attribute.value) && normalize(h.name + ' ' + h.alias).includes(q));
 document.querySelector('#count').textContent = `พบ ${found.length} จาก ${heroes.length} ฮีโร่`;
 list.innerHTML = found.map(h => `<button class="hero" type="button" data-hero="${escape(h.id)}" aria-pressed="${h.id === selected.id}"><span class="initial">${escape(h.initial)}</span><span>${escape(h.name)}<small>${escape(attrNames[h.attribute])}</small></span></button>`).join('');
 if (!found.length) list.innerHTML = '<div class="empty">ไม่พบฮีโร่ ลองชื่อภาษาอังกฤษหรือชื่อย่อ<button type="button" id="reset-search">ล้างตัวกรอง</button></div>';
}
function renderDetail() {
 const h = selected;
 detail.innerHTML = `<div class="hero-title"><span class="initial">${escape(h.initial)}</span><div><h2 tabindex="-1">${escape(h.name)}</h2><span class="role">${escape(attrNames[h.attribute])} · ${escape(h.role)}</span></div></div><p class="weakness">${escape(h.weak)}</p><div class="section-head"><h3>ฮีโร่ที่ใช้แก้ทาง</h3><span>${h.counters.length} ตัวเลือก • ไม่เรียงตามความเก่ง</span></div>${h.evidence ? `<p class="evidence">${escape(h.evidence)}</p>` : ''}<div class="cards">${h.counters.map((c,i) => `<article class="card"><span class="number">${String(i+1).padStart(2,'0')}</span><div><h4><button type="button" class="counter-link" data-hero="${escape(byName.get(c[0]).id)}" aria-label="ดูจุดอ่อนของ ${escape(c[0])}">${escape(c[0])}<span aria-hidden="true"> ↗</span></button></h4>${c[1] || c[2] ? `<div class="tags">${[c[1],c[2]].filter(Boolean).map(t=>`<span class="tag">${escape(t)}</span>`).join('')}</div>` : ''}<p>${escape(c[3])}</p>${c[4] ? `<p class="condition">เงื่อนไข · ${escape(c[4])}</p>` : ''}</div></article>`).join('')}</div><a class="source" href="${escape(h.sourceUrl)}" target="_blank" rel="noopener noreferrer">อ่านแหล่งข้อมูล: ${escape(h.sourceLabel || 'Dota Coach')} ↗</a><p class="note">แพตช์ที่แหล่งข้อมูลระบุ: ${escape(h.patch)} · ตรวจข้อมูล 24 ก.ย. 2026<br>สรุปจากกลไกการเล่น พร้อมข้อควรระวังประกอบ ไม่ใช่อันดับอัตราชนะ และไม่ใช่ทุกคู่แก้ทางที่เป็นไปได้</p>`;
 document.title = `${h.name} แพ้ทางใคร — Counter Atlas`;
}
function choose(id, push=true) {
 if (!byId.has(id)) return;
 selected = byId.get(id);
 search.value = '';
 attribute.value = '';
 if (push && location.hash !== '#'+id) history.pushState(null,'','#'+id);
 renderList();
 renderDetail();
 const active = list.querySelector('[aria-pressed="true"]');
 if (active) list.scrollTop = active.offsetTop - (list.clientHeight - active.offsetHeight) / 2;
 detail.querySelector('h2').focus({preventScroll:true});
 if (matchMedia('(max-width:760px)').matches) detail.scrollIntoView({block:'start'});
}
list.addEventListener('click', event => {
 const button = event.target.closest('[data-hero]');
 if (button) choose(button.dataset.hero);
 if (event.target.closest('#reset-search')) {search.value='';attribute.value='';renderList();search.focus();}
});
detail.addEventListener('click', event => {
 const button = event.target.closest('[data-hero]');
 if (button) choose(button.dataset.hero);
});
search.addEventListener('input', renderList);
attribute.addEventListener('change', renderList);
window.addEventListener('hashchange', () => choose(location.hash.slice(1), false));
renderList();
renderDetail();


