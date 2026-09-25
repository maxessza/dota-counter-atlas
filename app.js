const heroes = window.HEROES;
const search = document.querySelector('#search');
const attribute = document.querySelector('#attribute');
const list = document.querySelector('#heroes');
const detail = document.querySelector('#detail');
const draftInputs = [...document.querySelectorAll('.draft-hero-input')];
const draftPosition = document.querySelector('#draft-position');
const draftStatus = document.querySelector('#draft-status');
const draftResults = document.querySelector('#draft-results');
const draftItemResults = document.querySelector('#draft-item-results');
const draftClear = document.querySelector('#draft-clear');
const enemyCount = document.querySelector('#enemy-count');
const allyCount = document.querySelector('#ally-count');
const positions = [
 {id:'pos1',label:'Carry',short:'Pos 1'},
 {id:'pos2',label:'Mid',short:'Pos 2'},
 {id:'pos3',label:'Offlane',short:'Pos 3'},
 {id:'pos4',label:'Soft Support',short:'Pos 4'},
 {id:'pos5',label:'Hard Support',short:'Pos 5'}
];
const byId = new Map(heroes.map(h => [h.id, h]));
const byName = new Map(heroes.map(h => [h.name, h]));
const attrNames = {str:'Strength',agi:'Agility',int:'Intelligence',all:'Universal'};
const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = text => String(text).toLowerCase().replace(/[\s'’_-]+/g, '');
let selected = byId.get(location.hash.slice(1)) || byId.get('sniper') || heroes[0];
const matchups = heroes.reduce((total,h) => total + h.counters.length, 0);
document.querySelector('#hero-total').textContent = heroes.length;
document.querySelector('.scope').textContent = 'ครบ ' + heroes.length + ' ฮีโร่ตามรายชื่อที่ตรวจ • ' + matchups + ' คู่แก้ทาง';
function roleTokens(hero) {
 return String(hero.role || '').split('/').map(role => role.trim().toLowerCase()).filter(Boolean);
}
const preferredPositions = {
 pos1:new Set(['Luna','Phantom Lancer','Juggernaut','Sven','Slark','Spectre','Anti-Mage']),
 pos2:new Set(['Invoker','Ember Spirit','Outworld Destroyer','Dragon Knight','Earthshaker','Puck','Earth Spirit']),
 pos3:new Set(['Dark Seer','Dawnbreaker','Night Stalker','Enigma','Legion Commander','Dragon Knight','Pudge']),
 pos4:new Set(['Rubick','Bounty Hunter','Spirit Breaker','Techies','Nyx Assassin','Zeus','Grimstroke']),
 pos5:new Set(['Winter Wyvern','Disruptor','Lich','Ringmaster','Bane','Oracle','Techies'])
};
function fitsPosition(hero, positionId) {
 if (preferredPositions[positionId].has(hero.name)) return true;
 const roles = new Set(roleTokens(hero));
 const has = role => roles.has(role);
 if (positionId === 'pos1') return has('carry');
 if (positionId === 'pos2') return has('nuker') && !has('support') || has('carry') && (has('nuker') || has('escape') || has('initiator'));
 if (positionId === 'pos3') return has('durable') || has('initiator') || has('disabler') && !has('support');
 if (positionId === 'pos4') return has('support') && (has('initiator') || has('disabler') || has('escape') || has('nuker')) || !has('carry') && (has('initiator') || has('disabler')) && (has('escape') || has('nuker'));
 if (positionId === 'pos5') return has('support') && (has('disabler') || has('nuker') || has('durable') || has('escape')) || has('support') && !has('carry');
 return false;
}
function pairSource(hero, counter) {
 if (hero.name === 'Largo') return 'วิเคราะห์จากกลไก';
 if (hero.name === 'Tusk') {
  if (counter[0] === 'Anti-Mage') return 'Dota Coach';
  if (counter[0] === 'Disruptor' || counter[0] === 'Phantom Lancer') return 'Dota2Counters · วิเคราะห์กลไก';
  return 'Dota Coach';
 }
 if (String(counter[3] || '').startsWith('วิธีแก้ทาง ·')) return 'คู่จาก Dota Coach · วิเคราะห์เหตุผลเสริม';
 return hero.sourceLabel || 'Dota Coach';
}

function closeSuggestions(input) {
 const box = input.parentElement.querySelector('.hero-suggestions');
 if (!box) return;
 box.hidden = true;
 input.setAttribute('aria-expanded','false');
}
function renderSuggestions(input) {
 const box = input.parentElement.querySelector('.hero-suggestions');
 if (!box) return;
 const query = normalize(input.value.trim());
 if (!query || resolveHero(input.value)) {closeSuggestions(input);return;}
 const options = heroes.filter(hero => normalize(hero.name).startsWith(query) || normalize(hero.alias || '').startsWith(query)).slice(0,8);
 if (!options.length) {
  box.innerHTML = '<div class="suggestion-empty" role="option" aria-disabled="true">ไม่พบชื่อที่ขึ้นต้นด้วย “' + escape(input.value.trim()) + '”</div>';
 } else {
  box.innerHTML = options.map(hero => '<button type="button" class="hero-suggestion" role="option" data-suggest-id="' + escape(hero.id) + '"><strong>' + escape(hero.name) + '</strong><small>' + escape(hero.role) + '</small></button>').join('');
 }
 box.hidden = false;
 input.setAttribute('aria-expanded','true');
}

function renderList() {
 const q = normalize(search.value.trim());
 const found = heroes.filter(h => (!attribute.value || h.attribute === attribute.value) && normalize(h.name + ' ' + (h.alias || '')).includes(q));
 document.querySelector('#count').textContent = 'พบ ' + found.length + ' จาก ' + heroes.length + ' ฮีโร่';
 list.innerHTML = found.map(h => '<button class="hero" type="button" data-hero="' + escape(h.id) + '" aria-pressed="' + (h.id === selected.id) + '"><span class="initial">' + escape(h.initial) + '</span><span>' + escape(h.name) + '<small>' + escape(attrNames[h.attribute]) + '</small></span></button>').join('');
 if (!found.length) list.innerHTML = '<div class="empty">ไม่พบฮีโร่ ลองชื่อภาษาอังกฤษหรือชื่อย่อ<button type="button" id="reset-search">ล้างตัวกรอง</button></div>';
}
function renderItemSection(hero) {
 const items = (window.ITEM_COUNTERS && window.ITEM_COUNTERS[hero.name]) || [];
 const coachCurated = new Set(['Enigma','Largo','Primal Beast','Skywrath Mage']).has(hero.name);
 const itemSource = coachCurated
  ? '<a href="' + escape(hero.sourceUrl) + '" target="_blank" rel="noopener noreferrer">Dota Coach</a>'
  : '<a href="https://dota2counters.com/items/" target="_blank" rel="noopener noreferrer">Dota2Counters</a>';
 const coachLink = hero.sourceUrl && hero.sourceUrl.startsWith('https://dotacoach.gg/')
  ? ' · <a href="' + escape(hero.sourceUrl) + '" target="_blank" rel="noopener noreferrer">ดูคำอธิบาย matchup ใน Dota Coach</a>'
  : '';
 const cards = items.map((item,i) => {
  const guide = (window.ITEM_GUIDES && window.ITEM_GUIDES[item]) || ['เลือกตามสถานการณ์','เป็นตัวเลือกที่แหล่งข้อมูลระบุไว้ ให้ดูจุดอ่อนของศัตรูและกลไกของไอเทมประกอบก่อนซื้อ','ซื้อเมื่อเข้ากับตำแหน่งและแผนทีมของเรา'];
  return '<article class="item-card"><div class="item-card-head"><span class="item-number">' + String(i+1).padStart(2,'0') + '</span><div><h4>' + escape(item) + '</h4><span class="tag">' + escape(guide[0]) + '</span></div></div><p>' + escape(guide[1]) + '</p><p class="condition">พิจารณาเมื่อ · ' + escape(guide[2]) + '</p></article>';
 }).join('');
 const missing = items.length ? '' : '<p class="item-intro">ยังไม่มีรายการเฉพาะตัวนี้ ให้เปิดคำแนะนำจากแหล่งข้อมูลเพื่อดูตัวเลือกเพิ่มเติม</p>';
 const patchNote = hero.name === 'Largo'
  ? '<p class="item-caveat">หน้า Dota Coach ของ Largo ระบุส่วนไอเทมแก้ทางเป็นแพตช์ 7.41e จึงควรตรวจผลไอเทมอีกครั้งในแพตช์ปัจจุบัน</p>'
  : coachCurated ? '<p class="item-caveat">รายการนี้อ้างอิงคำแนะนำไอเทมของ Dota Coach ตามแพตช์ที่หน้าแหล่งข้อมูลระบุ</p>' : '';
 return '<section class="item-section" aria-labelledby="item-heading"><div class="section-head"><h3 id="item-heading">ไอเทมที่ควรพิจารณาแก้ทาง</h3><span>' + items.length + ' ตัวเลือก · ไม่ใช่ลำดับซื้อ</span></div><p class="item-intro">ไอเทมแต่ละชิ้นตอบโจทย์คนละแบบ เลือกตามฮีโร่ที่เราเล่น ตำแหน่ง และสถานการณ์ในเกม ไม่จำเป็นต้องซื้อครบ</p>' + missing + '<div class="item-grid">' + cards + '</div><p class="item-source">รายการตั้งต้น: ' + itemSource + (coachCurated ? ' · สรุปจากคำอธิบายไอเทมแก้ทางรายฮีโร่' : ' · รายการชุมชนที่ไม่เรียงอันดับ') + coachLink + '</p>' + patchNote + '<p class="note">เหตุผลในการ์ดสรุปจากกลไกทั่วไปของไอเทม ส่วนความเหมาะสมจริงขึ้นกับฮีโร่ที่เราเล่น ไอเทมศัตรู และจังหวะเกม</p></section>';
}
function renderDetail() {
 const h = selected;
 detail.innerHTML = '<div class="hero-title"><span class="initial">' + escape(h.initial) + '</span><div><h2 tabindex="-1">' + escape(h.name) + '</h2><span class="role">' + escape(attrNames[h.attribute]) + ' · ' + escape(h.role) + '</span></div></div><p class="weakness">' + escape(h.weak) + '</p><div class="section-head"><h3>ฮีโร่ที่ใช้แก้ทาง</h3><span>' + h.counters.length + ' ตัวเลือก • ไม่เรียงตามความเก่ง</span></div>' + (h.evidence ? '<p class="evidence">' + escape(h.evidence) + '</p>' : '') + '<div class="cards">' + h.counters.map((c,i) => {
  const counterHero = byName.get(c[0]);
  return '<article class="card"><span class="number">' + String(i+1).padStart(2,'0') + '</span><div><h4><button type="button" class="counter-link" data-hero="' + escape(counterHero.id) + '" aria-label="ดูจุดอ่อนของ ' + escape(c[0]) + '">' + escape(c[0]) + '<span aria-hidden="true"> ↗</span></button></h4><div class="tags">' + [c[1],c[2]].filter(Boolean).map(t => '<span class="tag">' + escape(t) + '</span>').join('') + '<span class="evidence-badge">' + escape(pairSource(h,c)) + '</span></div><p>' + escape(c[3]) + '</p>' + (c[4] ? '<p class="condition">เงื่อนไข · ' + escape(c[4]) + '</p>' : '') + '</div></article>';
 }).join('') + '</div>' + renderItemSection(h) + '<a class="source" href="' + escape(h.sourceUrl) + '" target="_blank" rel="noopener noreferrer">อ่านแหล่งข้อมูล: ' + escape(h.sourceLabel || 'Dota Coach') + ' ↗</a><p class="note">แพตช์ที่แหล่งข้อมูลระบุ: ' + escape(h.patch) + ' · ตรวจข้อมูล 24 ก.ย. 2026<br>สรุปจากกลไกการเล่น พร้อมข้อควรระวังประกอบ ไม่ใช่อันดับอัตราชนะ และไม่ใช่ทุกคู่แก้ทางที่เป็นไปได้</p>';
 document.title = h.name + ' แพ้ทางใคร — Counter Atlas';
}
function resolveHero(value) {
 const q = normalize(value.trim());
 if (!q) return null;
 return heroes.find(hero => normalize(hero.name) === q || normalize(hero.alias || '') === q || normalize(hero.id) === q) || null;
}
function collectPicks(team) {
 const picks = [];
 const invalid = [];
 const duplicates = [];
 const seen = new Set();
 draftInputs.filter(input => input.dataset.team === team).forEach(input => {
  const value = input.value.trim();
  if (!value) return;
  const hero = resolveHero(value);
  if (!hero) {invalid.push(value);return;}
  if (seen.has(hero.id)) {duplicates.push(hero.name);return;}
  seen.add(hero.id);
  picks.push({hero,position:input.dataset.position || ''});
 });
 return {picks,invalid,duplicates};
}
function renderDraftItemSection(enemyPicks) {
 if (!enemyPicks.length) return '';
 const curated = new Set(['Enigma','Largo','Primal Beast','Skywrath Mage']);
 const cards = enemyPicks.map(pick => {
  const hero = pick.hero;
  const items = (window.ITEM_COUNTERS && window.ITEM_COUNTERS[hero.name]) || [];
  const sourceUrl = curated.has(hero.name) ? hero.sourceUrl : 'https://dota2counters.com/items/';
  const sourceName = hero.name === 'Largo' ? 'Dota Coach · 7.41e' : curated.has(hero.name) ? 'Dota Coach' : 'Dota2Counters';
  const guideFor = item => (window.ITEM_GUIDES && window.ITEM_GUIDES[item]) || ['เลือกตามสถานการณ์','พิจารณากลไกของไอเทมให้ตรงกับจุดอ่อนของศัตรู','ซื้อเมื่อเข้ากับตำแหน่งและแผนทีม'];
  const preview = items.slice(0,4).map(item => '<span class="tag">' + escape(item) + '</span>').join('') + (items.length > 4 ? '<span class="tag more-items">+' + (items.length-4) + '</span>' : '');
  const details = items.map(item => {
   const guide = guideFor(item);
   return '<li><strong>' + escape(item) + '</strong><span class="tag">' + escape(guide[0]) + '</span><p>' + escape(guide[1]) + '</p><p class="condition">พิจารณาเมื่อ · ' + escape(guide[2]) + '</p></li>';
  }).join('');
  return '<article class="draft-item-card"><div class="draft-item-head"><button type="button" class="draft-hero-link" data-hero="' + escape(hero.id) + '">' + escape(hero.name) + '</button><span class="evidence-badge">' + sourceName + '</span></div><div class="draft-item-tags">' + preview + '</div><details class="draft-item-details"><summary>ดูเหตุผลและเงื่อนไขทั้งหมด · ' + items.length + ' ชิ้น</summary><ul>' + details + '</ul><a href="' + escape(sourceUrl) + '" target="_blank" rel="noopener noreferrer">เปิดแหล่งรายการ ↗</a></details></article>';
 }).join('');
 return '<section class="draft-item-section"><div class="draft-results-head"><h3>ไอเทมที่ทีมเราควรพิจารณา</h3><span>แยกตามฮีโร่ศัตรู · ตัวอย่างไม่เรียงอันดับ</span></div><p class="draft-item-note">เลือกดูเหตุผลและเงื่อนไขก่อนซื้อ ไอเทมขึ้นกับฮีโร่ที่เล่นและตำแหน่ง; กดชื่อศัตรูเพื่อเปิดรายละเอียด matchup</p><div class="draft-item-grid">' + cards + '</div></section>';
}
function renderDraft() {
 const enemies = collectPicks('enemy');
 const allies = collectPicks('ours');
 const enemyPicks = enemies.picks;
 const allyPicks = allies.picks;
 const allPicked = new Set([...enemyPicks,...allyPicks].map(pick => pick.hero.id));
 const positionsFilled = new Set(allyPicks.map(pick => pick.position).filter(Boolean));
 const previousPosition = draftPosition.value;
 const openPositions = positions.filter(position => !positionsFilled.has(position.id));
 enemyCount.textContent = enemyPicks.length + ' / 5';
 allyCount.textContent = allyPicks.length + ' / 5';
 draftPosition.innerHTML = openPositions.map(position => '<option value="' + position.id + '">' + position.label + ' · ' + position.short + '</option>').join('');
 if (openPositions.some(position => position.id === previousPosition)) draftPosition.value = previousPosition;
 else if (openPositions.length) draftPosition.value = openPositions[0].id;
 draftPosition.disabled = openPositions.length === 0;
 draftClear.disabled = !draftInputs.some(input => input.value.trim());
 draftItemResults.innerHTML = renderDraftItemSection(enemyPicks);
 const crossTeamDuplicates = enemyPicks.filter(enemy => allyPicks.some(ally => ally.hero.id === enemy.hero.id)).map(pick => pick.hero.name);
 const hasInvalid = enemies.invalid.length || allies.invalid.length;
 const hasDuplicates = enemies.duplicates.length || allies.duplicates.length || crossTeamDuplicates.length;
 if (hasInvalid) draftStatus.textContent = 'บางช่องยังไม่ตรงกับชื่อฮีโร่ในรายการ เลือกชื่อจากคำแนะนำให้ครบ';
 else if (hasDuplicates) draftStatus.textContent = 'มีฮีโร่ซ้ำในรายชื่อ: ' + [...enemies.duplicates,...allies.duplicates,...crossTeamDuplicates].join(', ') + ' · แก้ชื่อให้ไม่ซ้ำ';
 else if (!enemyPicks.length) draftStatus.textContent = 'กรอกฮีโร่ฝั่งตรงข้ามอย่างน้อย 1 ตัว (แนะนำให้ใส่ครบ 5 ตัว)';
 else if (!openPositions.length) draftStatus.textContent = 'ทีมเราครบทั้ง 5 ตำแหน่งแล้ว';
 else if (enemyPicks.length < 5) draftStatus.textContent = 'คำแนะนำชั่วคราวจากศัตรู ' + enemyPicks.length + ' / 5 ตัว · กรอกให้ครบเพื่อประเมินทั้งดราฟต์';
 else draftStatus.textContent = 'ประเมินจากศัตรูครบ 5 ตัว และทีมเราที่เลือกไว้ ' + allyPicks.length + ' / 5 ตัว';
 if (hasDuplicates) {
  draftResults.innerHTML = '<div class="draft-empty">แก้ช่องชื่อฮีโร่ที่ไม่ถูกต้องหรือซ้ำก่อน แล้วระบบจะคำนวณตัวเลือกให้ใหม่</div>';
  return;
 }
 if (!enemyPicks.length) {
  draftResults.innerHTML = '<div class="draft-empty">กรอกฮีโร่ศัตรูและตัวที่ทีมเราเลือกแล้ว เพื่อรับคำแนะนำสำหรับตำแหน่งที่ยังว่าง</div>';
  return;
 }
 if (!openPositions.length) {
  draftResults.innerHTML = '<div class="draft-empty">ทีมเรามีครบ 5 ตำแหน่งแล้ว · ล้างช่องตำแหน่งที่ต้องการเปลี่ยนเพื่อดูคำแนะนำ</div>';
  return;
 }
 const targetPosition = draftPosition.value;
 const position = positions.find(item => item.id === targetPosition);
 const teamRoleSet = new Set(allyPicks.flatMap(pick => roleTokens(pick.hero)));
 const recommendations = heroes.filter(hero => !allPicked.has(hero.id) && fitsPosition(hero,targetPosition)).map(hero => {
  const matches = enemyPicks.map(enemy => {
   const pair = enemy.hero.counters.find(counter => counter[0] === hero.name);
   return pair ? {enemy:enemy.hero,pair} : null;
  }).filter(Boolean);
  const addedRoles = roleTokens(hero).filter(role => !teamRoleSet.has(role));
  const metaRole = preferredPositions[targetPosition].has(hero.name);
  return {hero,matches,addedRoles,metaRole};
 }).filter(item => item.matches.length)
 .sort((a,b) => b.matches.length - a.matches.length || Number(b.metaRole) - Number(a.metaRole) || b.addedRoles.length - a.addedRoles.length || a.hero.name.localeCompare(b.hero.name))
 .slice(0,10);
 if (!recommendations.length) {
  draftResults.innerHTML = '<div class="draft-empty">ยังไม่พบตัวเลือกที่ตรงกับคู่แก้ทางในตำแหน่ง ' + escape(position.label) + ' · ลองตำแหน่งว่างอื่นหรือกรอกศัตรูให้ครบ</div>';
  return;
 }
 draftResults.innerHTML = '<div class="draft-results-head"><h3>คำแนะนำสำหรับ ' + escape(position.label) + ' · ' + position.short + '</h3><span>จัดตามจำนวนศัตรูที่แก้ทางได้ · ใช้รายชื่อทีมเราเพื่อตัดตัวซ้ำและดูบทบาทที่เติม</span></div><div class="draft-candidates">' + recommendations.map((item,index) => {
  const hero = item.hero;
  const addedRoleText = item.addedRoles.slice(0,3).map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(' · ');
  const teamFit = addedRoleText ? '<p class="team-fit">เติมบทบาททีม: ' + escape(addedRoleText) + '</p>' : '';
  const positionEvidence = item.metaRole ? '<span class="evidence-badge position-evidence">D2PT role grid · 7.41f</span>' : '';
  return '<article class="draft-candidate"><div class="draft-candidate-head"><span class="draft-rank">' + String(index+1).padStart(2,'0') + '</span><div><button class="draft-hero-link" type="button" data-hero="' + escape(hero.id) + '">' + escape(hero.name) + '</button><span class="role">' + escape(hero.role) + ' · ' + escape(position.short) + '</span></div><span class="coverage">' + item.matches.length + ' / ' + enemyPicks.length + ' ศัตรู</span></div><div class="draft-action-row"><button class="draft-pick-button" type="button" data-pick-hero="' + escape(hero.id) + '" data-position="' + targetPosition + '">เลือกลง ' + escape(position.short) + '</button></div>' + positionEvidence + teamFit + '<div class="draft-matchups">' + item.matches.map(match => '<section class="draft-matchup"><div class="draft-match-head"><strong>แก้ทาง ' + escape(match.enemy.name) + '</strong><span class="evidence-badge">' + escape(pairSource(match.enemy,match.pair)) + '</span></div><p>' + escape(match.pair[3]) + '</p>' + (match.pair[4] ? '<p class="condition">เงื่อนไข · ' + escape(match.pair[4]) + '</p>' : '') + '</section>').join('') + '</div></article>';
 }).join('') + '</div>';
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
draftInputs.forEach(input => {
 const box = input.parentElement.querySelector('.hero-suggestions');
 input.addEventListener('input', () => {renderSuggestions(input);renderDraft();});
 input.addEventListener('change', renderDraft);
 input.addEventListener('focus', () => {if (input.value.trim()) renderSuggestions(input);});
 input.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' && !box.hidden) {
   event.preventDefault();
   const first = box.querySelector('[data-suggest-id]');
   if (first) first.focus();
  } else if (event.key === 'Enter' && !box.hidden) {
   const first = box.querySelector('[data-suggest-id]');
   if (first) {event.preventDefault();first.click();}
  } else if (event.key === 'Escape') closeSuggestions(input);
 });
 box.addEventListener('mousedown', event => {
  if (event.target.closest('[data-suggest-id]')) event.preventDefault();
 });
 box.addEventListener('click', event => {
  const button = event.target.closest('[data-suggest-id]');
  if (!button) return;
  const hero = byId.get(button.dataset.suggestId);
  if (!hero) return;
  input.value = hero.name;
  closeSuggestions(input);
  renderDraft();
  input.focus();
 });
 box.addEventListener('keydown', event => {
  const options = [...box.querySelectorAll('[data-suggest-id]')];
  const index = options.indexOf(document.activeElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
   event.preventDefault();
   const step = event.key === 'ArrowDown' ? 1 : -1;
   const next = options[(index + step + options.length) % options.length];
   if (next) next.focus();
  } else if (event.key === 'Escape') {
   closeSuggestions(input);
   input.focus();
  }
 });
});
document.addEventListener('pointerdown', event => {
 if (!event.target.closest('.hero-picker')) draftInputs.forEach(closeSuggestions);
});

draftPosition.addEventListener('change', renderDraft);
draftClear.addEventListener('click', () => {
 draftInputs.forEach(input => {input.value='';});
 renderDraft();
 draftStatus.textContent = 'ล้างรายชื่อทั้งสองฝั่งแล้ว';
});
draftItemResults.addEventListener('click', event => {
 const button = event.target.closest('[data-hero]');
 if (button) choose(button.dataset.hero);
});
draftResults.addEventListener('click', event => {
 const pickButton = event.target.closest('[data-pick-hero]');
 if (pickButton) {
  const hero = byId.get(pickButton.dataset.pickHero);
  const positionId = pickButton.dataset.position;
  const slot = draftInputs.find(input => input.dataset.team === 'ours' && input.dataset.position === positionId);
  if (!hero || !slot || slot.value.trim()) return;
  slot.value = hero.name;
  draftInputs.forEach(closeSuggestions);
  renderDraft();
  const pickedPosition = positions.find(position => position.id === positionId);
  draftStatus.textContent = 'เลือก ' + hero.name + ' ลง ' + pickedPosition.label + ' แล้ว · กำลังแนะนำตำแหน่งที่ยังว่าง';
  const nextSlot = draftInputs.find(input => input.dataset.team === 'ours' && input.dataset.position === draftPosition.value);
  if (nextSlot) nextSlot.focus();
  return;
 }
 const button = event.target.closest('[data-hero]');
 if (button) choose(button.dataset.hero);
});
search.addEventListener('input', renderList);
attribute.addEventListener('change', renderList);
window.addEventListener('hashchange', () => choose(location.hash.slice(1), false));
renderList();
renderDetail();
renderDraft();

