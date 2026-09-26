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
const wardMarkers = document.querySelector('#ward-markers');
const wardSide = document.querySelector('#ward-side');
const wardArea = document.querySelector('#ward-area');
const wardCount = document.querySelector('#ward-count');
const wardMap = document.querySelector('#ward-map');
const wardEditToggle = document.querySelector('#ward-edit-toggle');
const wardResetPositions = document.querySelector('#ward-reset-positions');
const wardAddStart = document.querySelector('#ward-add-start');
const wardDeleteSelected = document.querySelector('#ward-delete-selected');
const wardAddForm = document.querySelector('#ward-add-form');
const wardNewTitle = document.querySelector('#ward-new-title');
const wardNewType = document.querySelector('#ward-new-type');
const wardNewSide = document.querySelector('#ward-new-side');
const wardNewZone = document.querySelector('#ward-new-zone');
const wardNewNote = document.querySelector('#ward-new-note');
const wardEditHint = document.querySelector('#ward-edit-hint');
const wardSpotInfo = document.querySelector('#ward-spot-info');
const workspace = document.querySelector('.workspace');
const wardMapView = document.querySelector('#ward-map-view');
const heroSidebarContent = document.querySelector('#hero-sidebar-content');
const heroModeButton = document.querySelector('#show-hero-mode');
const wardModeButton = document.querySelector('#show-ward-map');
const introSection = document.querySelector('.intro');
const draftTool = document.querySelector('.draft-tool');
let activeWardType = 'observer';
const wardSpots = [
 {id:'obs-radiant-river',type:'observer',side:'radiant',x:118,y:151,title:'ทางขึ้นแม่น้ำฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'ช่วยเห็นการหมุนจากแม่น้ำเข้าป่าฝั่ง Radiant และการเคลื่อนที่ใกล้ rune ฝั่งนี้'},
 {id:'obs-dire-river',type:'observer',side:'dire',x:218,y:139,title:'ทางขึ้นแม่น้ำฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'ช่วยจับการข้ามแม่น้ำเข้าป่าฝั่ง Dire และเส้นทางซัพพอร์ตที่หมุนจาก Mid'},
 {id:'obs-radiant-jungle',type:'observer',side:'radiant',x:78,y:210,title:'ทางเข้าป่าที่ทีม Radiant ใช้ฟาร์ม',zone:'ป่า Radiant',note:'วางเมื่อแคร์รีกำลังเล่นพื้นที่นี้ เพื่อเห็นทางเข้าก่อนถูก gank'},
 {id:'obs-radiant-triangle',type:'observer',side:'radiant',x:112,y:150,title:'ทางเชื่อมสามเหลี่ยมฝั่ง Radiant',zone:'ทางเชื่อมป่า',note:'ช่วยดูการย้ายระหว่าง Mid กับพื้นที่ฟาร์มด้านบน วางเมื่อทีมคุมทางเข้าได้'},
 {id:'obs-dire-jungle',type:'observer',side:'dire',x:245,y:105,title:'ทางเข้าป่าที่ทีม Dire ใช้ฟาร์ม',zone:'ป่า Dire',note:'ใช้ปกป้องพื้นที่ฟาร์มของทีม Dire หรือส่องการเข้าป่าจากฝั่งศัตรู'},
 {id:'obs-dire-triangle',type:'observer',side:'dire',x:207,y:105,title:'ทางเชื่อมสามเหลี่ยมฝั่ง Dire',zone:'ทางเชื่อมป่า',note:'ช่วยเห็นการเคลื่อนที่ระหว่างป่ากับเลนล่าง วางหลังทีมมีพื้นที่ปลอดภัย'},
 {id:'obs-roshan-west',type:'observer',side:'both',x:201,y:216,title:'ทางเข้าพื้นที่ Roshan ด้านตะวันตก',zone:'ทางเข้า Objective',note:'เห็นศัตรูที่กำลังเดินเข้าหา objective ได้เร็วกว่าการ ward ชิดหลุม Roshan'},
 {id:'obs-roshan-east',type:'observer',side:'both',x:228,y:200,title:'ทางเข้าพื้นที่ Roshan ด้านตะวันออก',zone:'ทางเข้า Objective',note:'ใช้ประกบอีกเส้นทางเข้าเมื่อทีมเตรียม Roshan หรือถอยออกจากพื้นที่'},
 {id:'obs-safe-lane',type:'observer',side:'radiant',x:57,y:239,title:'ทางเข้าป่าหลังเลนล่าง',zone:'เลน / ป้องกันแคร์รี',note:'ช่วยเตือนเมื่อศัตรูเดินอ้อมเข้าหาแคร์รีที่กำลังเก็บครีปใกล้เลน'},
 {id:'obs-dire-lane',type:'observer',side:'dire',x:263,y:79,title:'ทางเข้าป่าหลังเลนบน',zone:'เลน / ป้องกันแคร์รี',note:'ช่วยเตือนการหมุนเข้าหาแคร์รีหรือการดันเลนด้านบน'},
 {id:'sen-radiant-river',type:'sentry',side:'radiant',x:132,y:144,title:'ตรวจทางขึ้นแม่น้ำฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'ใช้เมื่อมีเหตุให้สงสัยว่า Observer อยู่ใกล้ทางขึ้นฝั่งนี้ หรือกำลัง reclaim พื้นที่ก่อน objective'},
 {id:'sen-dire-river',type:'sentry',side:'dire',x:204,y:150,title:'ตรวจทางขึ้นแม่น้ำฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'ตรวจหลังเห็นซัพพอร์ตศัตรูเดินผ่านบริเวณนี้ แทนการวาง Sentry สุ่มกลางแม่น้ำ'},
 {id:'sen-radiant-jungle',type:'sentry',side:'radiant',x:91,y:194,title:'ตรวจทางเข้าป่าฝั่ง Radiant',zone:'ป่า Radiant',note:'เหมาะเมื่อศัตรูหลบการ smoke หรือแคร์รีเราถอยจาก camp อย่างผิดปกติ'},
 {id:'sen-dire-jungle',type:'sentry',side:'dire',x:230,y:121,title:'ตรวจทางเข้าป่าฝั่ง Dire',zone:'ป่า Dire',note:'ใช้ตรวจแนวทางเดินที่ศัตรูอาจปัก Observer ก่อนกลับไป deward'},
 {id:'sen-roshan-west',type:'sentry',side:'radiant',x:198,y:215,title:'ตรวจทางเข้า Roshan ด้านตะวันตก',zone:'ทางเข้า Objective',note:'ตรวจทางเดินที่คาดว่าศัตรูใช้สอดส่อง Roshan หลังพบว่าทีมเราถูก contest เร็ว'},
 {id:'sen-roshan-east',type:'sentry',side:'dire',x:231,y:202,title:'ตรวจทางเข้า Roshan ด้านตะวันออก',zone:'ทางเข้า Objective',note:'เลือกตรวจเมื่อมีเบาะแสจากการเคลื่อนที่หรือก่อนเริ่ม objective ไม่จำเป็นต้องปักทุกครั้ง'},
 {id:'obs-r-top-lane-rotation',type:'observer',side:'radiant',x:43,y:125,title:'ทางหมุนเข้าท็อปเลนฝั่ง Radiant',zone:'เลน / ทางเข้า',note:'เห็นซัพพอร์ตหรือมิดที่เดินผ่านทางเชื่อมก่อนถึงเลน ช่วยให้เพื่อนถอยหรือเตรียมสวน'},
 {id:'obs-r-bottom-lane-approach',type:'observer',side:'radiant',x:105,y:262,title:'ทางเข้าบอตทอมเลนฝั่ง Radiant',zone:'เลน / ทางเข้า',note:'เห็นการเคลื่อนที่เข้าหาเลนและครีปที่กำลังถูกดัน เหมาะเมื่อทีมกำลังเล่นพื้นที่ด้านล่าง'},
 {id:'obs-r-rune-route',type:'observer',side:'radiant',x:136,y:128,title:'เส้นทางเข้ารูนฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'ช่วยให้มิดตัดสินใจดันครีปเพื่อ contest rune หรือถอยเมื่อเห็นศัตรูมาถึงก่อน'},
 {id:'obs-r-river-ramp',type:'observer',side:'radiant',x:95,y:159,title:'ทางลาดจากแม่น้ำเข้าป่าฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'จับการหมุนจากแม่น้ำเข้าป่าและเตือนแคร์รีที่กำลังฟาร์มใกล้ทางผ่าน'},
 {id:'obs-r-triangle-entry',type:'observer',side:'radiant',x:97,y:125,title:'ทางเข้าสามเหลี่ยมฝั่ง Radiant',zone:'ป่า / สามเหลี่ยม',note:'เห็นการเดินเข้าหาแคมป์และการเปลี่ยนเส้นทางจากเลนไปยังพื้นที่ฟาร์ม'},
 {id:'obs-r-portal-route',type:'observer',side:'radiant',x:42,y:55,title:'ทางออก Portal ฝั่ง Radiant',zone:'Portal / Gate',note:'ติดตามฮีโร่ที่ใช้ Portal และเห็นครีปหรือการเคลื่อนที่ใกล้ทางออก เพื่อเลือกว่าจะป้องกันเลนหรือหมุนตาม'},
 {id:'obs-r-tormentor-route',type:'observer',side:'radiant',x:143,y:245,title:'ทางเข้าพื้นที่ Tormentor ฝั่ง Radiant',zone:'Roshan / Tormentor',note:'ช่วยตรวจการรวมตัวก่อนทำ objective และเห็นศัตรูที่เดินเข้ามา contest'},
 {id:'obs-d-top-lane-rotation',type:'observer',side:'dire',x:260,y:55,title:'ทางหมุนเข้าท็อปเลนฝั่ง Dire',zone:'เลน / ทางเข้า',note:'เห็นการเข้าหาเลนจากป่าหรือแม่น้ำก่อนถึงตัวแคร์รี'},
 {id:'obs-d-bottom-lane-approach',type:'observer',side:'dire',x:230,y:261,title:'ทางเข้าบอตทอมเลนฝั่ง Dire',zone:'เลน / ทางเข้า',note:'จับการเดินอ้อมเข้าหาเลนและดูว่าศัตรูกำลังดันหรือเตรียม dive'},
 {id:'obs-d-rune-route',type:'observer',side:'dire',x:236,y:114,title:'เส้นทางเข้ารูนฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'แจ้งมิดเมื่อซัพพอร์ตศัตรูเข้าพื้นที่ rune เพื่อช่วยตัดสินใจ contest หรือหลีกเลี่ยงการโดนล้อม'},
 {id:'obs-d-river-jungle-ramp',type:'observer',side:'dire',x:263,y:147,title:'ทางลาดแม่น้ำเข้าป่าฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'เห็นการผ่านระหว่างแม่น้ำกับป่าฝั่ง Dire และช่วยคุมทางเข้าพื้นที่ฟาร์ม'},
 {id:'obs-d-triangle-entry',type:'observer',side:'dire',x:234,y:92,title:'ทางเข้าสามเหลี่ยมฝั่ง Dire',zone:'ป่า / สามเหลี่ยม',note:'ส่องเส้นทางระหว่างแคมป์กับเลนกลาง เหมาะเมื่อทีมชนะพื้นที่ด้านนี้แล้ว'},
 {id:'obs-d-portal-route',type:'observer',side:'dire',x:278,y:254,title:'ทางออก Portal ฝั่ง Dire',zone:'Portal / Gate',note:'ตรวจการเดินทางข้ามแผนที่และการเข้าถึงเลนใกล้เคียง ก่อนทีมเลือกเริ่มหรือหลีกเลี่ยงไฟต์'},
 {id:'obs-d-tormentor-route',type:'observer',side:'dire',x:184,y:227,title:'ทางเข้าพื้นที่ Tormentor ฝั่ง Dire',zone:'Roshan / Tormentor',note:'เห็นการเข้าพื้นที่ก่อนเริ่ม Tormentor และเตือนเมื่ออีกทีมกำลังเดินมา contest'},
 {id:'sen-r-top-lane-check',type:'sentry',side:'radiant',x:55,y:108,title:'ตรวจจุดวาง Ward ทางท็อปเลน Radiant',zone:'เลน / ทางเข้า',note:'ใช้หลังเห็นซัพพอร์ตศัตรูหายจากเลนหรือเดินผ่านทางนี้ เพื่อตรวจ Observer ที่อาจเปิดทาง gank'},
 {id:'sen-r-bottom-lane-check',type:'sentry',side:'radiant',x:102,y:250,title:'ตรวจ Ward ทางเข้าบอตทอมเลน Radiant',zone:'เลน / ทางเข้า',note:'ตรวจเมื่อแคร์รีหลบครีปหรือศัตรูรู้ตำแหน่งทีมเราซ้ำ ๆ บริเวณเลนล่าง'},
 {id:'sen-r-rune-cliff',type:'sentry',side:'radiant',x:144,y:142,title:'ตรวจพื้นที่สูงใกล้รูนฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'ใช้เมื่อมีเบาะแสว่าศัตรูเห็นการเดินของมิด ไม่จำเป็นต้องปัก Sentry กลางแม่น้ำทุกครั้ง'},
 {id:'sen-r-river-ramp',type:'sentry',side:'radiant',x:107,y:177,title:'ตรวจทางลาดแม่น้ำฝั่ง Radiant',zone:'แม่น้ำ / Mid',note:'เช็กทางเดินที่ซัพพอร์ตหายไปหลังออกจากเลน หรือหลังทีมกำลัง reclaim พื้นที่ Mid'},
 {id:'sen-r-triangle-high',type:'sentry',side:'radiant',x:123,y:137,title:'ตรวจพื้นที่สูงทางเข้าสามเหลี่ยม Radiant',zone:'ป่า / สามเหลี่ยม',note:'ตรวจหลังทีมชนะไฟต์หรือเห็นศัตรูวางวิสัยทัศน์ก่อนถอยเข้าป่า'},
 {id:'sen-r-portal-exit',type:'sentry',side:'radiant',x:60,y:66,title:'ตรวจทางออก Portal ฝั่ง Radiant',zone:'Portal / Gate',note:'ใช้เมื่อเห็นศัตรูใช้ Portal หรือกำลังค้นหาวิสัยทัศน์ใกล้ทางออกเพื่อป้องกันการตามรอย'},
 {id:'sen-r-tormentor',type:'sentry',side:'radiant',x:129,y:239,title:'ตรวจวิสัยทัศน์ก่อนทำ Tormentor ฝั่ง Radiant',zone:'Roshan / Tormentor',note:'เช็กทางเข้าหลังมีเหตุให้คิดว่าศัตรูรู้จังหวะทำ objective ของทีม'},
 {id:'sen-d-top-lane-check',type:'sentry',side:'dire',x:251,y:70,title:'ตรวจจุดวาง Ward ทางท็อปเลน Dire',zone:'เลน / ทางเข้า',note:'ตรวจเมื่อศัตรูอ่านการเดินของทีมได้หรือมีซัพพอร์ตหายเข้าทางเลนนี้'},
 {id:'sen-d-bottom-lane-check',type:'sentry',side:'dire',x:227,y:249,title:'ตรวจ Ward ทางเข้าบอตทอมเลน Dire',zone:'เลน / ทางเข้า',note:'ใช้หลังเห็นศัตรูเดินอ้อมเข้าหาเลนหรือครีปถูกปล่อยให้ดันโดยไม่มีฮีโร่มารับ'},
 {id:'sen-d-rune-cliff',type:'sentry',side:'dire',x:226,y:128,title:'ตรวจพื้นที่สูงใกล้รูนฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'ตรวจจุดสูงที่น่าจะเห็นมิดหรือการแย่ง rune เมื่อมีสัญญาณว่าศัตรูใช้ข้อมูลนี้'},
 {id:'sen-d-river-ramp',type:'sentry',side:'dire',x:247,y:158,title:'ตรวจทางลาดแม่น้ำฝั่ง Dire',zone:'แม่น้ำ / Mid',note:'เช็กทางผ่านหลังเห็นซัพพอร์ตศัตรูเดินออกจากเลนไปทางแม่น้ำ'},
 {id:'sen-d-triangle-high',type:'sentry',side:'dire',x:232,y:104,title:'ตรวจพื้นที่สูงทางเข้าสามเหลี่ยม Dire',zone:'ป่า / สามเหลี่ยม',note:'ใช้ deward เมื่อทีมกำลังยึดพื้นที่คืนหรือพบว่าศัตรูถอยได้ก่อนถูก smoke'},
 {id:'sen-d-portal-exit',type:'sentry',side:'dire',x:267,y:246,title:'ตรวจทางออก Portal ฝั่ง Dire',zone:'Portal / Gate',note:'ตรวจเมื่อศัตรูข้าม Portal มาช่วยไฟต์หรือมีฮีโร่หายไปจากอีกด้านของแผนที่'},
 {id:'sen-d-tormentor',type:'sentry',side:'dire',x:196,y:224,title:'ตรวจทางเข้าก่อนทำ Tormentor ฝั่ง Dire',zone:'Roshan / Tormentor',note:'วางเมื่อมีเบาะแสเรื่อง Ward รอบ objective เพื่อไม่ให้ศัตรูเห็นการเริ่มก่อนทีมพร้อมสู้'}
];
const wardPositionStorageKey = 'dota2-ward-map-positions-v1';
const wardCatalogStorageKey = 'dota2-ward-map-catalog-v1';
const wardDefaultSpots = wardSpots.slice();
const wardDefaultPositions = new Map(wardDefaultSpots.map(spot => [spot.id, {x:spot.x, y:spot.y}]));
const wardDefaultIds = new Set(wardDefaultSpots.map(spot => spot.id));
const wardZoneLabels = {river:'แม่น้ำ / รูน',jungle:'ป่า / สามเหลี่ยม',lane:'เลน / ทางเข้า',portal:'Portal / Gate',objective:'Roshan / Tormentor'};
const wardDeletedSpotIds = new Set();
const wardCustomSpotIds = new Set();
let wardEditMode = false;
let wardPlacementMode = false;
let wardHasEdits = false;
let wardSelectedSpotId = null;
let pendingWardPosition = null;
let wardDragging = null;
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

function setWorkspaceMode(mode) {
 const isWard = mode === 'ward';
 workspace.classList.toggle('ward-mode', isWard);
 introSection.hidden = isWard;
 draftTool.hidden = isWard;
 heroSidebarContent.hidden = isWard;
 detail.hidden = isWard;
 wardMapView.hidden = !isWard;
 heroModeButton.classList.toggle('is-active', !isWard);
 heroModeButton.setAttribute('aria-pressed', String(!isWard));
 wardModeButton.classList.toggle('is-active', isWard);
 wardModeButton.setAttribute('aria-pressed', String(isWard));
 if (isWard) renderWardMap();
 window.scrollTo({top:0,behavior:'smooth'});
}
function wardAreaOf(spot) {
 const zone = String(spot.zone || '').toLowerCase();
 if (zone.includes('portal') || zone.includes('gate')) return 'portal';
 if (zone.includes('roshan') || zone.includes('tormentor') || zone.includes('objective')) return 'objective';
 if (zone.includes('แม่น้ำ') || zone.includes('mid') || zone.includes('rune')) return 'river';
 if (zone.includes('ป่า') || zone.includes('สามเหลี่ยม') || zone.includes('triangle')) return 'jungle';
 return 'lane';
}
function loadWardCatalogEdits() {
 try {
  const saved = JSON.parse(localStorage.getItem(wardCatalogStorageKey) || '{}');
  if (Array.isArray(saved.deleted)) saved.deleted.forEach(id => { if (wardDefaultIds.has(id)) wardDeletedSpotIds.add(id); });
  if (Array.isArray(saved.added)) saved.added.slice(0,200).forEach(item => {
   if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !/^custom-[a-z0-9-]+$/.test(item.id) || wardSpots.some(spot => spot.id === item.id)) return;
   if (!['observer','sentry'].includes(item.type) || !['radiant','dire','both'].includes(item.side) || !Object.values(wardZoneLabels).includes(item.zone)) return;
   if (!Number.isFinite(item.x) || !Number.isFinite(item.y) || item.x < 0 || item.x > 320 || item.y < 0 || item.y > 320) return;
   if (typeof item.title !== 'string' || !item.title.trim() || typeof item.note !== 'string' || !item.note.trim()) return;
   const spot = {id:item.id,type:item.type,side:item.side,x:item.x,y:item.y,title:item.title.trim().slice(0,70),zone:item.zone,note:item.note.trim().slice(0,300)};
   wardSpots.push(spot); wardCustomSpotIds.add(spot.id);
  });
  wardHasEdits = wardDeletedSpotIds.size > 0 || wardCustomSpotIds.size > 0;
 } catch { wardHasEdits = false; }
}
function loadWardPositions() {
 try {
  const saved = JSON.parse(localStorage.getItem(wardPositionStorageKey) || '{}');
  wardSpots.forEach(spot => {
   const position = saved[spot.id];
   if (position && Number.isFinite(position.x) && Number.isFinite(position.y) && position.x >= 0 && position.x <= 320 && position.y >= 0 && position.y <= 320) {
    spot.x = position.x; spot.y = position.y;
    const original = wardDefaultPositions.get(spot.id);
    if (!original || original.x !== spot.x || original.y !== spot.y) wardHasEdits = true;
   }
  });
 } catch { /* Ignore unavailable or malformed browser storage. */ }
}
function wardMarkerTransform(spot) {
 return 'translate(' + (spot.x * 1.981132) + ' ' + (spot.y * 1.871875) + ')';
}
function saveWardPositions() {
 try {
  localStorage.setItem(wardPositionStorageKey, JSON.stringify(Object.fromEntries(wardSpots.map(spot => [spot.id, {x:spot.x, y:spot.y}]))));
  wardEditHint.textContent = 'บันทึกตำแหน่งแล้วในเบราว์เซอร์นี้';
 } catch { wardEditHint.textContent = 'บันทึกอัตโนมัติไม่ได้ ตำแหน่งจะอยู่จนกว่าจะปิดหน้านี้'; }
 wardHasEdits = true; updateWardEditControls();
}
function saveWardCatalogEdits() {
 try {
  const added = wardSpots.filter(spot => wardCustomSpotIds.has(spot.id));
  const deleted = [...wardDeletedSpotIds];
  if (!added.length && !deleted.length) localStorage.removeItem(wardCatalogStorageKey);
  else localStorage.setItem(wardCatalogStorageKey, JSON.stringify({added, deleted}));
  wardEditHint.textContent = 'บันทึกการเพิ่ม/ลบ Ward แล้วในเบราว์เซอร์นี้';
  return true;
 } catch { wardEditHint.textContent = 'บันทึกการเพิ่ม/ลบไม่ได้ ตำแหน่งจะอยู่จนกว่าจะปิดหน้านี้'; return false; }
}
function updateWardEditControls() {
 const selected = wardSpots.find(spot => spot.id === wardSelectedSpotId);
 wardEditToggle.setAttribute('aria-pressed', String(wardEditMode));
 wardEditToggle.textContent = wardEditMode ? 'เสร็จสิ้นการปรับหมุด' : 'ปรับตำแหน่งหมุด';
 wardEditToggle.classList.toggle('is-editing', wardEditMode);
 wardAddStart.hidden = !wardEditMode;
 wardAddStart.textContent = wardPlacementMode ? 'ยกเลิกเลือกตำแหน่ง' : '＋ เพิ่ม Ward เอง';
 wardAddStart.setAttribute('aria-pressed', String(wardPlacementMode));
 wardDeleteSelected.hidden = !wardEditMode || !selected || (selected.type !== 'sentry' && !wardCustomSpotIds.has(selected.id));
 wardDeleteSelected.textContent = selected && selected.type === 'sentry' ? 'ลบจุด Sentry ที่เลือก' : 'ลบ Ward ที่เลือก';
 wardResetPositions.hidden = !wardEditMode || !wardHasEdits;
 wardEditHint.hidden = !wardEditMode;
 wardMap.classList.toggle('is-editing', wardEditMode);
 wardMap.classList.toggle('is-placing', wardPlacementMode);
}
function setWardEditMode(enabled) {
 wardEditMode = enabled; wardDragging = null;
 if (!wardEditMode) { wardPlacementMode = false; pendingWardPosition = null; wardAddForm.hidden = true; }
 if (wardEditMode) wardEditHint.textContent = 'ลากหมุดเพื่อย้ายตำแหน่ง หรือกด ＋ เพิ่ม Ward เอง · เลือกหมุดแล้วใช้ลูกศรขยับละเอียด';
 updateWardEditControls();
}
function resetWardPositions() {
 wardDefaultSpots.forEach(spot => { const position = wardDefaultPositions.get(spot.id); spot.x = position.x; spot.y = position.y; });
 wardSpots.splice(0, wardSpots.length, ...wardDefaultSpots);
 wardDeletedSpotIds.clear(); wardCustomSpotIds.clear(); pendingWardPosition = null; wardPlacementMode = false; wardSelectedSpotId = null;
 wardAddForm.hidden = true; wardAddForm.reset();
 let cleared = true;
 try { localStorage.removeItem(wardPositionStorageKey); localStorage.removeItem(wardCatalogStorageKey); } catch { cleared = false; }
 wardHasEdits = false; renderWardMap();
 if (wardEditMode) wardEditHint.textContent = cleared ? 'คืนค่า Ward เริ่มต้นทั้งหมดแล้ว' : 'คืนค่าในหน้านี้แล้ว แต่เบราว์เซอร์ลบข้อมูลที่บันทึกไว้ไม่ได้';
 updateWardEditControls();
}
function beginWardPlacement() {
 if (!wardEditMode) return;
 if (wardPlacementMode) { wardPlacementMode = false; pendingWardPosition = null; wardEditHint.textContent = 'ยกเลิกการเลือกตำแหน่งแล้ว'; }
 else { wardPlacementMode = true; pendingWardPosition = null; wardAddForm.hidden = true; wardNewType.value = activeWardType; wardNewSide.value = wardSide.value === 'both' ? 'radiant' : wardSide.value; wardEditHint.textContent = 'คลิกตำแหน่งที่ต้องการบนแผนที่เพื่อวาง Ward ใหม่'; }
 updateWardEditControls();
}
function deleteSelectedWard() {
 const spot = wardSpots.find(item => item.id === wardSelectedSpotId);
 if (!wardEditMode || !spot || (spot.type !== 'sentry' && !wardCustomSpotIds.has(spot.id))) return;
 if (!window.confirm('ลบหมุด “' + spot.title + '” หรือไม่? ใช้ “คืนค่า Ward เริ่มต้น” เพื่อกู้หมุดเริ่มต้นกลับมา')) return;
 if (wardCustomSpotIds.has(spot.id)) { const index = wardSpots.findIndex(item => item.id === spot.id); if (index >= 0) wardSpots.splice(index, 1); wardCustomSpotIds.delete(spot.id); }
 else wardDeletedSpotIds.add(spot.id);
 wardSelectedSpotId = null; wardHasEdits = true;
 const saved = saveWardCatalogEdits(); renderWardMap();
 wardEditHint.textContent = saved ? 'ลบหมุดแล้ว · คืนได้ด้วยปุ่มคืนค่า Ward เริ่มต้น' : 'ลบหมุดแล้วในหน้านี้ แต่เบราว์เซอร์บันทึกการลบไม่ได้';
 updateWardEditControls();
}
function wardPositionFromPointer(event) {
 const screenMatrix = wardMap.getScreenCTM(); if (!screenMatrix) return null;
 const point = wardMap.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
 const local = point.matrixTransform(screenMatrix.inverse());
 return {x:Math.max(0,Math.min(320,Math.round(local.x/1.981132*10)/10)),y:Math.max(0,Math.min(320,Math.round(local.y/1.871875*10)/10))};
}
function moveWardSpot(spot, marker, position) {
 if (!position) return false;
 const changed = Math.abs(spot.x-position.x)>0.05 || Math.abs(spot.y-position.y)>0.05;
 spot.x=position.x; spot.y=position.y; marker.setAttribute('transform',wardMarkerTransform(spot)); return changed;
}
loadWardCatalogEdits();
loadWardPositions();
function renderWardMap() {
 if (!wardMarkers || !wardSide || !wardArea) return;
 const visibleSpots = wardSpots.filter(spot => !wardDeletedSpotIds.has(spot.id) && spot.type === activeWardType && (wardSide.value === 'both' || spot.side === 'both' || spot.side === wardSide.value) && (wardArea.value === 'all' || wardAreaOf(spot) === wardArea.value));
 wardCount.textContent = visibleSpots.length + ' จุด';
 wardMarkers.innerHTML = visibleSpots.map(spot => {
  const sideLabel = spot.side === 'both' ? 'ทั้งสองฝั่ง' : spot.side === 'radiant' ? 'Radiant' : 'Dire';
  const typeLabel = spot.type === 'observer' ? 'Observer' : 'Sentry / ตรวจ Ward';
  return '<g class="ward-marker ward-marker-' + spot.type + (spot.side === 'both' ? ' ward-marker-both' : '') + '" transform="' + wardMarkerTransform(spot) + '" data-ward-id="' + spot.id + '" role="button" tabindex="0" aria-label="' + escape(spot.title + ' · ' + typeLabel + ' · ' + sideLabel) + '" aria-pressed="false"><title>' + escape(spot.title) + '</title><circle class="ward-marker-halo" r="13"></circle><circle class="ward-marker-core" r="8"></circle><text class="ward-marker-letter" y="3.5">' + (spot.type === 'observer' ? 'O' : 'S') + '</text></g>';
 }).join('');
 if (visibleSpots.length) showWardSpot(visibleSpots[0].id);
 else {
  wardSelectedSpotId = null;
  wardSpotInfo.innerHTML = '<strong>ไม่มีจุดในตัวกรองนี้</strong><span>เปลี่ยนฝั่งหรือชนิด Ward เพื่อดูตำแหน่งอื่น</span>';
  updateWardEditControls();
 }
}
function showWardSpot(id) {
 const spot = wardSpots.find(item => item.id === id);
 if (!spot) return;
 wardSelectedSpotId = id;
 const sideLabel = spot.side === 'both' ? 'ใช้ได้ทั้งสองฝั่ง' : spot.side === 'radiant' ? 'ฝั่ง Radiant' : 'ฝั่ง Dire';
 const typeLabel = spot.type === 'observer' ? 'Observer' : 'Sentry / ตรวจ Ward';
 wardSpotInfo.innerHTML = '<strong>' + escape(spot.title) + '</strong><span>' + escape(typeLabel + ' · ' + sideLabel + ' · ' + spot.zone) + '</span><p>' + escape(spot.note) + '</p>';
 wardMarkers.querySelectorAll('[data-ward-id]').forEach(marker => marker.setAttribute('aria-pressed', String(marker.dataset.wardId === id)));
 updateWardEditControls();
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
function renderDraftItemSection(enemyPicks,allyPicks) {
 if (!enemyPicks.length) return '';
 const supportItems = new Set(['Force Staff','Glimmer Cape','Lotus Orb','Arcane Boots','Magic Wand',"Eul's Scepter of Divinity",'Wind Waker','Infused Raindrops','Ring of Regen','Ring of Health']);
 const teamItems = new Set(['Mekansm','Guardian Greaves','Pipe of Insight','Solar Crest',"Vladmir's Offering",'Spirit Vessel','Urn of Shadows','Headdress','Cloak']);
 const frontlineItems = new Set(['Crimson Guard','Assault Cuirass',"Shiva's Guard",'Vanguard',"Heaven's Halberd",'Heart of Tarrasque','Eternal Shroud','Radiance','Bloodstone']);
 const carryItems = new Set(['Battle Fury','Monkey King Bar','Maelstrom','Mjollnir','Butterfly','Diffusal Blade','Manta Style','Satanic','Desolator','Moon Shard','Dragon Lance','Eye of Skadi','Boots of Travel','Phase Boots','Boots of Speed']);
 const catchItems = new Set(['Orchid Malevolence','Bloodthorn','Scythe of Vyse','Abyssal Blade','Rod of Atos','Gleipnir','Silver Edge','Nullifier','Aghanim\'s Scepter','Dagon','Helm of the Dominator']);
 const personalItems = new Set(['Aeon Disk',"Linken's Sphere",'Ghost Scepter','Ethereal Blade']);
 function buyerHint(item) {
  let positions = ['pos1','pos2','pos3'];
  let label = 'core หรือ initiator ที่ใช้ไอเทมนี้ได้';
  if (teamItems.has(item)) {positions=['pos3','pos4','pos5'];label='ออฟเลนหรือซัพพอร์ตที่รับหน้าที่ไอเทมช่วยทีม';}
  else if (supportItems.has(item)) {positions=['pos4','pos5','pos3'];label='ซัพพอร์ตที่ใช้ไอเทมช่วยเซฟหรือจัดตำแหน่ง';}
  else if (frontlineItems.has(item)) {positions=['pos3','pos4','pos5'];label='ออฟเลนหรือแนวหน้าที่มีพื้นที่ออกไอเทม';}
  else if (carryItems.has(item)) {positions=['pos1','pos2','pos3'];label='core ที่ฮีโร่และบิลด์ใช้ไอเทมนี้ได้';}
  else if (catchItems.has(item)) {positions=['pos2','pos3','pos1'];label='core หรือ initiator ที่เข้าถึงเป้าหมายได้';}
  else if (personalItems.has(item)) return 'ผู้ซื้อที่ควรเช็ก: คนที่ถูกศัตรูเล็งหรือโดนสกิลนี้บ่อย ไม่จำเป็นต้องเป็นตำแหน่งเดิมทุกเกม';
  const chosen = positions.map(id=>allyPicks.find(pick=>pick.position===id)).filter(Boolean).slice(0,2);
  const candidateText = chosen.length
   ? chosen.map(pick=>pick.hero.name+' ('+(positionsList.find(position=>position.id===pick.position)?.short || pick.position)+')').join(' / ')
   : positions.map(id=>positionsList.find(position=>position.id===id)?.short || id).join(' / ');
  return 'ตำแหน่งที่ควรประเมิน: '+candidateText+' · '+label+'; ตรวจบิลด์ฮีโร่ก่อนซื้อ';
 }
 const positionsList = positions;
 const coverage = new Map();
 enemyPicks.forEach(pick=>{
  ((window.ITEM_COUNTERS && window.ITEM_COUNTERS[pick.hero.name]) || []).forEach(item=>{
   if(!coverage.has(item)) coverage.set(item,[]);
   coverage.get(item).push(pick.hero);
  });
 });
 const rankedItems = [...coverage.entries()].map(([name,targets])=>({name,targets})).sort((a,b)=>b.targets.length-a.targets.length || a.name.localeCompare(b.name));
 const sharedCount = rankedItems.filter(item=>item.targets.length>1).length;
 const recommendedItems = rankedItems.slice(0,6);
 const aggregateCards = recommendedItems.map(item=>{
  const guide=(window.ITEM_GUIDES && window.ITEM_GUIDES[item.name]) || ['เลือกตามสถานการณ์','ตรวจกลไกของไอเทมให้ตรงกับจุดอ่อนของศัตรู','ซื้อเมื่อเข้ากับตำแหน่งและแผนทีม'];
  const targetNames=item.targets.map(hero=>escape(hero.name)).join(' · ');
  return '<article class="draft-item-overview-card"><div class="draft-item-overview-head"><h4>'+escape(item.name)+'</h4><span class="evidence-badge">อยู่ในรายการ '+item.targets.length+' / '+enemyPicks.length+' ตัว</span></div><p class="draft-item-targets">พบกับ: '+targetNames+'</p><p>'+escape(guide[1])+'</p><p class="draft-item-buyer">'+escape(buyerHint(item.name))+'</p><p class="condition">พิจารณาเมื่อ · '+escape(guide[2])+'</p></article>';
 }).join('');
 const overlapNote = enemyPicks.length>1
  ? sharedCount ? 'พบ '+sharedCount+' ไอเทมที่ปรากฏในรายการของศัตรูตั้งแต่ 2 ตัวขึ้นไป แสดงสูงสุด 6 ชิ้น เรียงตามจำนวนรายการที่พบ ไม่ใช่อัตราชนะ'
   : 'ยังไม่มีไอเทมชื่อเดียวกันซ้ำในรายการของศัตรูที่เลือก; ด้านล่างแสดงตัวเลือกจากรายการที่กรอก'
  : 'แสดงตัวเลือกของศัตรูที่กรอก; เมื่อใส่ครบทีมจะช่วยเห็นไอเทมที่ใช้รับมือร่วมกัน';
 const curated = new Set(['Enigma','Largo','Primal Beast','Skywrath Mage']);
 const enemyCards = enemyPicks.map(pick => {
  const hero = pick.hero;
  const items = (window.ITEM_COUNTERS && window.ITEM_COUNTERS[hero.name]) || [];
  const sourceUrl = curated.has(hero.name) ? hero.sourceUrl : 'https://dota2counters.com/items/';
  const sourceName = hero.name === 'Largo' ? 'Dota Coach · 7.41e' : curated.has(hero.name) ? 'Dota Coach' : 'Dota2Counters';
  const preview = items.slice(0,4).map(item => '<span class="tag">'+escape(item)+'</span>').join('') + (items.length>4?'<span class="tag more-items">+'+(items.length-4)+'</span>':'');
  return '<article class="draft-item-card"><div class="draft-item-head"><button type="button" class="draft-hero-link" data-hero="'+escape(hero.id)+'">'+escape(hero.name)+'</button><span class="evidence-badge">'+sourceName+'</span></div><div class="draft-item-tags">'+preview+'</div><a class="draft-item-source" href="'+escape(sourceUrl)+'" target="_blank" rel="noopener noreferrer">เปิดรายการทั้งหมด ↗</a></article>';
 }).join('');
 const overview = aggregateCards
  ? '<div class="draft-item-overview-grid">'+aggregateCards+'</div>'
  : '<p class="draft-empty">ยังไม่มีรายการไอเทมของศัตรูที่เลือก</p>';
 return '<section class="draft-item-section"><div class="draft-results-head"><h3>สรุปไอเทมแก้ทางทั้งทีม</h3><span>อ้างอิงจาก '+enemyPicks.length+' / 5 ฮีโร่ศัตรู</span></div><p class="draft-item-note">'+escape(overlapNote)+'</p>'+overview+'<p class="draft-item-note">ตำแหน่งผู้ซื้อเป็นแนวทางกว้าง ๆ จากหน้าที่ของไอเทม ไม่ได้ตรวจบิลด์จริงหรือความเหมาะสมเฉพาะฮีโร่ที่เลือก; ให้ทีมตกลงผู้ซื้อเพื่อไม่ให้ซื้อซ้ำ</p><details class="enemy-item-breakdown"><summary>ดูตัวอย่างไอเทมแยกตามศัตรู</summary><div class="draft-item-grid">'+enemyCards+'</div></details></section>';
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
 draftItemResults.innerHTML = renderDraftItemSection(enemyPicks,allyPicks);
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

heroModeButton.addEventListener('click', () => setWorkspaceMode('heroes'));
wardModeButton.addEventListener('click', () => setWorkspaceMode('ward'));
function setActiveWardType(type) {
 activeWardType = type;
 document.querySelectorAll('[data-ward-type]').forEach(filter => {
  const isActive = filter.dataset.wardType === type;
  filter.classList.toggle('is-active', isActive);
  filter.setAttribute('aria-pressed', String(isActive));
 });
 renderWardMap();
}
document.querySelector('.ward-controls').addEventListener('click', event => {
 const button = event.target.closest('[data-ward-type]');
 if (button) setActiveWardType(button.dataset.wardType);
});
wardSide.addEventListener('change', renderWardMap);
wardArea.addEventListener('change', renderWardMap);
wardEditToggle.addEventListener('click', () => setWardEditMode(!wardEditMode));
wardResetPositions.addEventListener('click', resetWardPositions);
wardAddStart.addEventListener('click', beginWardPlacement);
wardDeleteSelected.addEventListener('click', deleteSelectedWard);
wardAddForm.addEventListener('submit', event => {
 event.preventDefault();
 if (!pendingWardPosition) { wardEditHint.textContent = 'เลือกตำแหน่งบนแผนที่ก่อนบันทึก Ward'; return; }
 const title = wardNewTitle.value.trim().slice(0,70);
 const note = wardNewNote.value.trim().slice(0,300);
 const zone = wardZoneLabels[wardNewZone.value];
 if (!title || !note || !zone) return;
 const spot = {id:'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8),type:wardNewType.value,side:wardNewSide.value,x:pendingWardPosition.x,y:pendingWardPosition.y,title,zone,note};
 wardSpots.push(spot);
 wardCustomSpotIds.add(spot.id);
 wardHasEdits = true;
 const saved = saveWardCatalogEdits();
 wardAddForm.reset();
 wardAddForm.hidden = true;
 pendingWardPosition = null;
 wardPlacementMode = false;
 wardSide.value = 'both';
 wardArea.value = 'all';
 setActiveWardType(spot.type);
 showWardSpot(spot.id);
 wardEditHint.textContent = saved ? 'เพิ่ม Ward แล้ว · บันทึกไว้ในเบราว์เซอร์นี้' : 'เพิ่ม Ward แล้วในหน้านี้ แต่เบราว์เซอร์บันทึกไม่ได้';
 updateWardEditControls();
});
document.querySelector('#ward-add-cancel').addEventListener('click', () => {
 wardAddForm.reset(); wardAddForm.hidden = true; pendingWardPosition = null;
 wardEditHint.textContent = 'ยกเลิกการเพิ่ม Ward แล้ว';
});
wardMap.addEventListener('click', event => {
 if (!wardPlacementMode) return;
 const position = wardPositionFromPointer(event);
 if (!position) return;
 event.preventDefault(); event.stopPropagation();
 pendingWardPosition = position;
 wardPlacementMode = false;
 wardAddForm.hidden = false;
 wardEditHint.textContent = 'กรอกชื่อและเหตุผลของ Ward จุดใหม่นี้';
 updateWardEditControls();
 wardNewTitle.focus();
});
wardMarkers.addEventListener('pointerdown', event => {
 const marker = event.target.closest('[data-ward-id]');
 if (!wardEditMode || wardPlacementMode || !marker || (event.button !== undefined && event.button !== 0)) return;
 const spot = wardSpots.find(item => item.id === marker.dataset.wardId);
 if (!spot) return;
 event.preventDefault();
 wardDragging = {id:spot.id, pointerId:event.pointerId, marker, changed:false};
 showWardSpot(spot.id);
 try { marker.setPointerCapture(event.pointerId); } catch {}
});
wardMarkers.addEventListener('pointermove', event => {
 if (!wardDragging || event.pointerId !== wardDragging.pointerId) return;
 const spot = wardSpots.find(item => item.id === wardDragging.id);
 if (spot) wardDragging.changed = moveWardSpot(spot, wardDragging.marker, wardPositionFromPointer(event)) || wardDragging.changed;
});
function finishWardDrag(event) {
 if (!wardDragging || event.pointerId !== wardDragging.pointerId) return;
 const changed = wardDragging.changed; wardDragging = null;
 if (changed) saveWardPositions();
}
wardMarkers.addEventListener('pointerup', finishWardDrag);
wardMarkers.addEventListener('pointercancel', finishWardDrag);
wardMarkers.addEventListener('click', event => {
 if (wardPlacementMode) return;
 const marker = event.target.closest('[data-ward-id]');
 if (marker) showWardSpot(marker.dataset.wardId);
});
wardMarkers.addEventListener('keydown', event => {
 if (wardEditMode && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key) && event.target.matches('[data-ward-id]')) {
  event.preventDefault();
  const spot = wardSpots.find(item => item.id === event.target.dataset.wardId);
  if (!spot) return;
  const step = event.shiftKey ? 5 : 1;
  const position = {x:spot.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0), y:spot.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0)};
  moveWardSpot(spot, event.target, {x:Math.max(0,Math.min(320,position.x)),y:Math.max(0,Math.min(320,position.y))});
  showWardSpot(spot.id); saveWardPositions(); return;
 }
 if (event.key === 'Escape' && wardEditMode) { setWardEditMode(false); return; }
 if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-ward-id]')) { event.preventDefault(); showWardSpot(event.target.dataset.wardId); }
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
renderWardMap();




