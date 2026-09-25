// ไอเทมแก้ทางแยกจากคำแนะนำชุมชน และตัวเลือกจาก Dota Coach ในฮีโร่ที่ต้องใช้รายการเฉพาะ
// ลำดับในแต่ละแถวไม่ใช่ลำดับความสำคัญหรือ build ที่ต้องซื้อครบ
const rows = `
Abaddon|Orchid Malevolence|Bloodthorn|Eul's Scepter of Divinity|Silver Edge|Ethereal Blade|Spirit Vessel
Alchemist|Assault Cuirass|Shiva's Guard|Heaven's Halberd|Scythe of Vyse|Spirit Vessel
Ancient Apparition|Hood of Defiance|Pipe of Insight|Black King Bar|Force Staff|Hurricane Pike|Shadow Blade
Anti-Mage|Aeon Disk|Abyssal Blade|Black King Bar|Linken's Sphere|Arcane Boots|Ghost Scepter
Arc Warden|Hood of Defiance|Pipe of Insight|Black King Bar|Force Staff|Hurricane Pike|Shadow Blade
Axe|Eul's Scepter of Divinity|Vladmir's Offering|Satanic|Force Staff|Silver Edge|Mekansm
Bane|Linken's Sphere|Abyssal Blade|Black King Bar|Aghanim's Scepter|Lotus Orb
Batrider|Linken's Sphere|Eul's Scepter of Divinity|Force Staff|Lotus Orb|Aeon Disk|Magic Wand
Beastmaster|Linken's Sphere|Aeon Disk|Battle Fury|Maelstrom|Mjollnir
Bloodseeker|Abyssal Blade|Linken's Sphere|Crimson Guard|Heart of Tarrasque|Lotus Orb|Guardian Greaves
Bounty Hunter|Guardian Greaves|Lotus Orb|Black King Bar|Eul's Scepter of Divinity|Manta Style
Brewmaster|Black King Bar|Monkey King Bar
Bristleback|Silver Edge|Solar Crest|Assault Cuirass|Spirit Vessel|Diffusal Blade|Ghost Scepter
Broodmother|Spirit Vessel|Boots of Travel|Vanguard|Crimson Guard|Abyssal Blade|Radiance
Centaur Warrunner|Radiance|Black King Bar|Rod of Atos
Chaos Knight|Shiva's Guard|Blade Mail|Butterfly|Ghost Scepter|Ethereal Blade|Manta Style
Chen|Shiva's Guard|Dagon|Battle Fury|Maelstrom|Black King Bar
Clinkz|Blade Mail|Black King Bar|Orchid Malevolence|Linken's Sphere|Lotus Orb|Manta Style
Clockwerk|Force Staff|Hurricane Pike|Eul's Scepter of Divinity
Crystal Maiden|Force Staff|Hurricane Pike|Eul's Scepter of Divinity
Dark Seer|Orchid Malevolence|Blade Mail|Eul's Scepter of Divinity
Dark Willow|Hood of Defiance|Glimmer Cape|Dragon Lance|Blade Mail|Black King Bar|Bloodthorn
Dawnbreaker|Black King Bar|Scythe of Vyse|Crimson Guard|Ghost Scepter
Dazzle|Orchid Malevolence|Bloodthorn|Diffusal Blade|Dagon|Eul's Scepter of Divinity
Death Prophet|Blade Mail|Orchid Malevolence|Bloodthorn|Diffusal Blade|Eul's Scepter of Divinity|Guardian Greaves
Disruptor|Black King Bar|Aghanim's Scepter|Linken's Sphere|Lotus Orb|Manta Style|Hood of Defiance
Doom|Mekansm|Guardian Greaves|Linken's Sphere|Lotus Orb|Glimmer Cape|Orchid Malevolence
Dragon Knight|Shiva's Guard|Mekansm|Desolator|Solar Crest
Drow Ranger|Blade Mail|Black King Bar|Heaven's Halberd|Manta Style|Eul's Scepter of Divinity|Rod of Atos
Earth Spirit|Black King Bar|Pipe of Insight|Eul's Scepter of Divinity|Manta Style|Guardian Greaves|Lotus Orb
Earthshaker|Pipe of Insight|Black King Bar|Radiance|Eul's Scepter of Divinity|Rod of Atos|Scythe of Vyse
Elder Titan|Aeon Disk|Scythe of Vyse|Abyssal Blade|Eul's Scepter of Divinity|Orchid Malevolence|Force Staff
Ember Spirit|Orchid Malevolence|Bloodthorn|Black King Bar|Abyssal Blade|Manta Style|Scythe of Vyse
Enchantress|Blade Mail|Spirit Vessel|Silver Edge|Shiva's Guard
Enigma|Eul's Scepter of Divinity|Orchid Malevolence|Pipe of Insight|Glimmer Cape|Force Staff|Aeon Disk|Scythe of Vyse
Faceless Void|Aeon Disk|Orchid Malevolence|Scythe of Vyse|Eul's Scepter of Divinity|Crimson Guard|Wind Waker
Grimstroke|Black King Bar|Manta Style|Lotus Orb|Eul's Scepter of Divinity|Force Staff|Pipe of Insight
Gyrocopter|Blade Mail|Black King Bar|Crimson Guard|Assault Cuirass
Hoodwink|Force Staff|Hurricane Pike|Monkey King Bar|Silver Edge|Blade Mail
Huskar|Black King Bar|Pipe of Insight|Silver Edge|Heaven's Halberd|Linken's Sphere|Spirit Vessel
Invoker|Black King Bar|Pipe of Insight|Eul's Scepter of Divinity|Glimmer Cape|Blade Mail|Force Staff
Io|Dagon|Ethereal Blade|Rod of Atos|Orchid Malevolence|Bloodthorn|Scythe of Vyse
Jakiro|Black King Bar|Orchid Malevolence|Pipe of Insight
Juggernaut|Eul's Scepter of Divinity|Ghost Scepter|Lotus Orb|Force Staff|Shadow Blade|Glimmer Cape
Keeper of the Light|Blade Mail|Eul's Scepter of Divinity|Lotus Orb|Black King Bar
Kez|Satanic|Monkey King Bar|Aghanim's Scepter|Abyssal Blade|Diffusal Blade|Nullifier
Kunkka|Crimson Guard|Black King Bar|Eul's Scepter of Divinity
Largo|Spirit Vessel|Eul's Scepter of Divinity|Force Staff|Orchid Malevolence|Diffusal Blade|Black King Bar|Nullifier|Scythe of Vyse
Legion Commander|Ghost Scepter|Ethereal Blade|Heaven's Halberd|Eul's Scepter of Divinity|Linken's Sphere|Solar Crest
Leshrac|Black King Bar|Blade Mail|Diffusal Blade
Lich|Glimmer Cape|Shadow Blade|Blade Mail|Black King Bar|Eul's Scepter of Divinity|Manta Style
Lifestealer|Force Staff|Orchid Malevolence|Manta Style|Heaven's Halberd|Solar Crest
Lina|Black King Bar|Aghanim's Scepter|Eul's Scepter of Divinity|Blade Mail|Linken's Sphere|Lotus Orb
Lion|Black King Bar|Eul's Scepter of Divinity|Blade Mail|Linken's Sphere|Lotus Orb|Bloodthorn
Lone Druid|Ghost Scepter|Heaven's Halberd
Luna|Glimmer Cape|Shadow Blade|Silver Edge|Vanguard|Abyssal Blade|Crimson Guard
Lycan|Heaven's Halberd|Blade Mail|Ghost Scepter|Ethereal Blade|Rod of Atos|Crimson Guard
Magnus|Eul's Scepter of Divinity|Orchid Malevolence|Force Staff|Radiance|Rod of Atos
Marci|Blade Mail|Heaven's Halberd|Ethereal Blade|Ghost Scepter|Eul's Scepter of Divinity|Rod of Atos
Mars|Silver Edge|Black King Bar|Glimmer Cape
Medusa|Diffusal Blade|Blade Mail|Heaven's Halberd|Spirit Vessel|Solar Crest|Hurricane Pike
Meepo|Black King Bar|Scythe of Vyse|Orchid Malevolence|Abyssal Blade|Manta Style|Lotus Orb
Mirana|Black King Bar|Glimmer Cape|Pipe of Insight|Manta Style
Monkey King|Battle Fury|Force Staff|Urn of Shadows|Spirit Vessel|Eul's Scepter of Divinity|Shiva's Guard
Morphling|Monkey King Bar|Black King Bar|Pipe of Insight|Orchid Malevolence|Bloodthorn|Heaven's Halberd
Muerta|Black King Bar|Glimmer Cape|Eternal Shroud|Pipe of Insight|Mage Slayer
Naga Siren|Blade Mail|Ghost Scepter|Battle Fury|Maelstrom|Mjollnir|Gleipnir
Nature's Prophet|Boots of Travel|Heaven's Halberd|Force Staff|Hurricane Pike|Orchid Malevolence|Battle Fury
Necrophos|Spirit Vessel|Shiva's Guard|Nullifier|Glimmer Cape|Eul's Scepter of Divinity|Wind Waker
Night Stalker|Manta Style|Lotus Orb|Linken's Sphere|Force Staff|Ghost Scepter|Eul's Scepter of Divinity
Nyx Assassin|Black King Bar|Eul's Scepter of Divinity|Eye of Skadi|Heart of Tarrasque|Bloodstone|Pipe of Insight
Ogre Magi|Black King Bar|Pipe of Insight|Orchid Malevolence|Hurricane Pike|Silver Edge|Manta Style
Omniknight|Orchid Malevolence|Eul's Scepter of Divinity|Nullifier
Oracle|Black King Bar|Orchid Malevolence|Eul's Scepter of Divinity|Hood of Defiance|Glimmer Cape|Manta Style
Outworld Destroyer|Mekansm|Magic Wand|Pipe of Insight|Black King Bar|Helm of the Dominator
Pangolier|Black King Bar|Abyssal Blade|Eul's Scepter of Divinity|Force Staff|Rod of Atos
Phantom Assassin|Monkey King Bar|Maelstrom|Blade Mail|Bloodthorn|Scythe of Vyse|Black King Bar
Phantom Lancer|Battle Fury|Heaven's Halberd|Radiance|Diffusal Blade|Silver Edge|Maelstrom
Phoenix|Black King Bar|Orchid Malevolence|Scythe of Vyse|Lotus Orb|Eul's Scepter of Divinity|Moon Shard
Primal Beast|Mage Slayer|Pipe of Insight|Blade Mail|Black King Bar|Orchid Malevolence|Hurricane Pike|Force Staff|Shiva's Guard
Puck|Black King Bar|Orchid Malevolence|Scythe of Vyse|Eul's Scepter of Divinity|Dagon
Pudge|Lotus Orb|Force Staff|Manta Style|Diffusal Blade|Glimmer Cape|Eul's Scepter of Divinity
Pugna|Force Staff|Glimmer Cape|Pipe of Insight|Black King Bar|Linken's Sphere|Lotus Orb
Queen of Pain|Blade Mail|Orchid Malevolence|Bloodthorn|Rod of Atos|Scythe of Vyse|Abyssal Blade
Razor|Linken's Sphere|Lotus Orb|Force Staff|Hurricane Pike
Riki|Manta Style|Silver Edge|Force Staff|Ghost Scepter|Shadow Blade
Ringmaster|Bloodstone|Orchid Malevolence|Desolator|Force Staff|Eul's Scepter of Divinity|Scythe of Vyse
Rubick|Black King Bar|Linken's Sphere|Diffusal Blade
Sand King|Black King Bar|Linken's Sphere|Lotus Orb|Blade Mail|Orchid Malevolence
Shadow Demon|Eul's Scepter of Divinity|Lotus Orb|Manta Style|Linken's Sphere|Force Staff
Shadow Fiend|Eul's Scepter of Divinity|Orchid Malevolence|Bloodthorn|Scythe of Vyse
Shadow Shaman|Phase Boots|Force Staff|Lotus Orb|Linken's Sphere|Dragon Lance
Silencer|Eul's Scepter of Divinity|Lotus Orb|Manta Style|Guardian Greaves|Black King Bar|Bloodthorn
Skywrath Mage|Eul's Scepter of Divinity|Lotus Orb|Mage Slayer|Pipe of Insight|Black King Bar|Force Staff|Glimmer Cape|Linken's Sphere
Slardar|Ghost Scepter|Shiva's Guard|Radiance|Heaven's Halberd|Butterfly|Black King Bar
Slark|Force Staff|Hurricane Pike|Black King Bar|Abyssal Blade|Heaven's Halberd|Monkey King Bar
Snapfire|Blade Mail|Black King Bar|Diffusal Blade
Sniper|Blade Mail|Eul's Scepter of Divinity|Linken's Sphere|Lotus Orb
Spectre|Scythe of Vyse|Black King Bar|Battle Fury|Radiance|Silver Edge|Crimson Guard
Spirit Breaker|Ghost Scepter|Eul's Scepter of Divinity|Rod of Atos|Abyssal Blade|Scythe of Vyse|Force Staff
Storm Spirit|Orchid Malevolence|Bloodthorn|Scythe of Vyse|Rod of Atos|Gleipnir|Aeon Disk
Sven|Force Staff|Hurricane Pike|Ghost Scepter|Heaven's Halberd|Rod of Atos|Blade Mail
Techies|Black King Bar|Orchid Malevolence|Bloodthorn|Scythe of Vyse|Hood of Defiance|Glimmer Cape
Templar Assassin|Radiance|Urn of Shadows|Spirit Vessel|Ghost Scepter|Eul's Scepter of Divinity|Force Staff
Terrorblade|Manta Style|Linken's Sphere|Orchid Malevolence|Scythe of Vyse|Maelstrom|Dagon
Tidehunter|Black King Bar|Silver Edge|Diffusal Blade
Timbersaw|Spirit Vessel|Orchid Malevolence|Bloodthorn|Black King Bar|Scythe of Vyse|Diffusal Blade
Tinker|Blade Mail|Linken's Sphere|Black King Bar|Lotus Orb
Tiny|Black King Bar|Desolator|Assault Cuirass|Shiva's Guard
Treant Protector|Battle Fury|Force Staff|Hurricane Pike|Manta Style|Guardian Greaves
Troll Warlord|Blade Mail|Silver Edge|Heaven's Halberd|Bloodthorn|Scythe of Vyse
Tusk|Force Staff|Lotus Orb|Blade Mail|Manta Style
Underlord|Force Staff|Diffusal Blade|Shiva's Guard|Pipe of Insight|Boots of Travel
Undying|Manta Style|Orchid Malevolence|Scythe of Vyse|Crimson Guard
Ursa|Scythe of Vyse|Aghanim's Scepter|Heaven's Halberd|Aeon Disk|Ghost Scepter|Silver Edge
Vengeful Spirit|Linken's Sphere|Diffusal Blade|Lotus Orb|Assault Cuirass|Silver Edge
Venomancer|Pipe of Insight|Glimmer Cape|Black King Bar|Blade Mail
Viper|Black King Bar|Ghost Scepter|Glimmer Cape|Force Staff|Silver Edge|Manta Style
Visage|Assault Cuirass|Shiva's Guard|Heaven's Halberd|Bloodthorn|Monkey King Bar|Black King Bar
Void Spirit|Orchid Malevolence|Bloodthorn|Hood of Defiance|Pipe of Insight|Black King Bar
Warlock|Orchid Malevolence|Diffusal Blade|Eul's Scepter of Divinity
Weaver|Orchid Malevolence|Linken's Sphere|Shadow Blade|Scythe of Vyse|Ghost Scepter|Nullifier|Abyssal Blade|Vanguard
Windranger|Monkey King Bar|Eul's Scepter of Divinity|Abyssal Blade|Orchid Malevolence|Bloodthorn|Scythe of Vyse|Linken's Sphere
Winter Wyvern|Lotus Orb|Linken's Sphere|Black King Bar|Spirit Vessel
Witch Doctor|Black King Bar|Lotus Orb|Eul's Scepter of Divinity|Linken's Sphere|Vanguard
Wraith King|Diffusal Blade|Manta Style|Scythe of Vyse|Spirit Vessel|Battle Fury|Heaven's Halberd
Zeus|Black King Bar|Pipe of Insight|Hood of Defiance|Lotus Orb|Mage Slayer|Force Staff|Blade Mail|Heart of Tarrasque
`.trim();
window.ITEM_COUNTERS = Object.fromEntries(rows.split(/\r?\n/).map(line => {
 const [hero, ...items] = line.split('|');
 return [hero, items];
}));

window.ITEM_GUIDES = {

 "Abyssal Blade": ["ล็อกเป้าหมาย", "สตันเป้าหมายเพื่อหยุดจังหวะพุ่ง หนี หรือร่ายสกิล แล้วให้ทีมโฟกัสต่อ", "เหมาะกับฮีโร่ที่เข้าถึงตัวได้; ระวังเป้าหมายที่มีภูมิคุ้มกันสถานะ"],
 "Aghanim's Scepter": ["อัปเกรดสกิล", "เพิ่มความสามารถให้ฮีโร่ฝั่งเรา ซึ่งอาจช่วยรับมือ matchup นี้ได้ตามสกิลที่อัปเกรด", "ตรวจผลอัปเกรดของฮีโร่ที่เล่นก่อนซื้อ; ไม่ใช่ไอเทมแก้ทางโดยตรงทุกเกม"],
 "Aeon Disk": ["กันโดนระเบิด", "ช่วยให้รอดจากคอมโบชุดใหญ่หนึ่งจังหวะเมื่อพลังชีวิตลดฮวบ", "เป็นตัวเลือกป้องกันตามเกมและมีคูลดาวน์ยาว; ไม่ได้หยุดศัตรู"],
 "Arcane Boots": ["เติมมานาทีม", "ช่วยให้มีมานาใช้สกิลและไอเทมรับมือศัตรูต่อเนื่อง", "เหมาะกับฮีโร่ซัพพอร์ตหรือทีมที่ขาดมานา"],
 "Assault Cuirass": ["รับมือกายภาพ", "เพิ่มเกราะให้ทีมและช่วยลดเกราะเป้าหมาย ทำให้ทีมยืนสู้และโจมตีกายภาพได้ดีขึ้น", "คุ้มเมื่อเกมมีการโจมตีกายภาพและทีมเราใช้การโจมตีปกติ"],
 "Battle Fury": ["เคลียร์ภาพลวง/ครีป", "ดาเมจวงกว้างช่วยจัดการภาพลวงตาหรือยูนิตจำนวนมากได้เร็วขึ้น", "เหมาะกับฮีโร่ตำแหน่ง core ที่ฟาร์มและโจมตีได้ต่อเนื่อง"],
 "Black King Bar": ["กันเวทและคุม", "ช่วยผ่านสกิลควบคุมและลดความเสี่ยงจากคอมโบเวทของศัตรู", "กดก่อนโดนใบ้หรือสตัน; ยังมีสกิลบางชนิดที่ทะลุภูมิคุ้มกันสถานะได้"],
 "Blade Mail": ["สะท้อนดาเมจ", "ลงโทษศัตรูที่พุ่งเข้ามาและทุ่มดาเมจใส่เรา", "กดตอนศัตรูลงคอมโบ; ระวังการหยุดโจมตี การถอนตัว หรือการโจมตีจากระยะไกล"],
 "Bloodstone": ["ยืนในไฟต์เวท", "ช่วยเพิ่มความทนทานระหว่างใช้เวทและยืนใกล้ศัตรู", "พิจารณาเมื่อฮีโร่เราได้ประโยชน์จากการยืนสู้; ไม่ได้ป้องกันการควบคุมโดยตรง"],
 "Bloodthorn": ["ใบ้และโฟกัส", "ใบ้เป้าหมายและช่วยให้ทีมลงดาเมจใส่ตัวที่พึ่งสกิลหนีหรือสกิลสำคัญ", "ซื้อเมื่อทีมเข้าถึงและปิดเป้าหมายได้; เช็กไอเทมล้างสถานะของศัตรู"],
 "Boots of Speed": ["ขยับหลบและไคท์", "เพิ่มความเร็วเพื่อถอยออกจากวงสกิลหรือรักษาระยะจากการเข้าประชิด", "มีประโยชน์ตั้งแต่ต้นเกม แต่ต้องอ่านทิศทางสกิลและตำแหน่งด้วย"],
 "Boots of Travel": ["เคลื่อนที่ข้ามแผนที่", "ช่วยตอบโต้การดันเลนหรือไล่ตามการแยกดัน", "พิจารณาในช่วงกลางถึงท้ายเกมเมื่อการโยกเลนสำคัญ"],
 "Butterfly": ["หลบการโจมตี", "เพิ่มโอกาสหลบการโจมตีปกติและเพิ่มความเร็วโจมตี", "มีประโยชน์เมื่อรับมือดาเมจกายภาพ; ลดคุณค่าลงเมื่อศัตรูมี True Strike"],
 "Crimson Guard": ["ลดการโจมตีใส่ทีม", "ช่วยลดความเสียหายจากการโจมตีปกติที่ทีมรับในช่วงเวลาสั้น ๆ", "คุ้มเมื่อศัตรูพึ่งการโจมตีหรือภาพลวง; ไม่ได้กันสกิลเวท"],
 "Dagon": ["เร่งคอมโบปิดงาน", "เพิ่มดาเมจระเบิดเพื่อปิดฮีโร่ตัวบางก่อนมีโอกาสตอบโต้", "เป็นตัวเลือกเฉพาะฮีโร่และจังหวะ; ไม่ใช่ไอเทมป้องกันหรือแก้ทางสากล"],
 "Desolator": ["เร่งดาเมจกายภาพ", "ลดเกราะเป้าหมายเพื่อให้ทีมโฟกัสปิดตัวสำคัญได้เร็วขึ้น", "ซื้อเมื่อทีมมีดาเมจกายภาพและเข้าถึงเป้าหมายได้"],
 "Diffusal Blade": ["กดมานาและไล่ตาม", "โจมตีเผามานาและช่วยชะลอเป้าหมายที่ต้องใช้มานาเพื่อทำงานหรือหนี", "ต้องตีถึงตัว; ผลต่อฮีโร่ที่มานาสำรองมากหรือมีตัวล้างสถานะอาจจำกัด"],
 "Disperser": ["เผามานาและล้างสถานะ", "ช่วยกดมานาเป้าหมายและล้างสถานะบางชนิดให้ผู้ใช้หรือเพื่อนร่วมทีมตามจังหวะ", "เลือกเมื่อฮีโร่เราใช้การโจมตีตามเป้าหมายได้และต้องการความคล่องตัวเพิ่ม"],
 "Dragon Lance": ["รักษาระยะโจมตี", "เพิ่มระยะโจมตีให้ยืนทำดาเมจจากตำแหน่งปลอดภัยขึ้น", "เหมาะกับฮีโร่โจมตีระยะไกล; ยังต้องระวังการเข้าถึงจากมุมอับ"],
 "Eternal Shroud": ["ทนเวท", "เพิ่มความทนทานต่อดาเมจเวทระหว่างยืนปะทะ", "เลือกให้เหมาะกับฮีโร่และดาเมจฝั่งตรงข้าม; ไม่ได้ช่วยกันสตันทุกชนิด"],
 "Ethereal Blade": ["กันการโจมตีปกติ", "ทำให้เป้าหมายโจมตีปกติไม่ได้ชั่วคราว จึงช่วยซื้อเวลาเมื่อโดน core กายภาพเข้าถึง", "เป้าหมายจะรับเวทแรงขึ้น; ระวังใช้ใส่ทีมที่มีคอมโบเวท"],
 "Eul's Scepter of Divinity": ["ล้างสถานะ/หลบสกิล", "ยกตัวเองขึ้นชั่วคราวเพื่อล้างสถานะบางชนิดหรือหลบจังหวะสกิล และใช้หยุดการร่ายบางครั้ง", "ต้องกดก่อนถูกล็อก; การยกเป้าหมายอาจช่วยศัตรูซื้อเวลาได้"],
 "Eye of Skadi": ["กดการฟื้นเลือด", "การโจมตีช่วยลดการฟื้นฟูและทำให้เป้าหมายเคลื่อนที่หรือโจมตีช้าลง", "เหมาะเมื่อมี sustain หรือจำเป็นต้องไล่ติดตัว; ต้องโจมตีถึงเป้าหมาย"],
 "Force Staff": ["ช่วยเพื่อนหนี", "ผลักตัวเองหรือเพื่อนออกจากวงสกิลและระยะเข้าถึงของศัตรู", "ใช้ก่อนโดนสตันหรือใบ้; ผลักอาจไม่ช่วยถ้าติดรากหรือถูกควบคุมแล้ว"],
 "Ghost Scepter": ["กันการโจมตีกายภาพ", "ทำให้ผู้ใช้หลบการโจมตีปกติช่วงสั้น ๆ", "เหมาะเมื่อโดน core กายภาพเข้าถึง; ระวังดาเมจเวทที่แรงขึ้น"],
 "Gleipnir": ["จับหลายเป้าหมาย", "รากพื้นที่ช่วยหยุดฮีโร่ที่เคลื่อนที่ไวหรือแยกตำแหน่งกัน", "ต้องใช้ทันก่อนเป้าหมายหลบหรือมีภูมิคุ้มกัน/ล้างสถานะ"],
 "Glimmer Cape": ["เซฟตัวเองหรือเพื่อน", "ช่วยพรางตัวและเพิ่มโอกาสรอดจากคอมโบเวทให้เป้าหมายที่กดใส่", "ใช้ให้ทันก่อนโดนควบคุม; ฝั่งตรงข้ามแก้พรางได้ด้วยการตรวจจับ"],
 "Guardian Greaves": ["ฟื้นฟูและช่วยทีม", "เติมพลังชีวิตให้ทีมและช่วยผู้ใช้รับมือสถานะบางชนิด", "เหมาะกับซัพพอร์ตเมื่อทีมต้องยืนรับความเสียหายต่อเนื่อง"],
 "Heart of Tarrasque": ["เพิ่มความทนทาน", "เพิ่มพลังชีวิตและการฟื้นตัวเพื่อไม่ให้ถูกคอมโบสั้น ๆ ปิดง่าย", "ช่วยยืนเลนหรือรับดาเมจต่อเนื่อง; ไม่ได้หยุดการล็อกหรือการลดฟื้นฟู"],
 "Heaven's Halberd": ["หยุดการโจมตี", "ปลดอาวุธเป้าหมายชั่วคราวเพื่อลดดาเมจจากการโจมตีปกติ", "เหมาะกับ core ที่ต้องเข้าประชิด; มีผลน้อยกับดาเมจจากสกิล"],
 "Helm of the Dominator": ["เพิ่มยูนิตช่วยรับสกิล", "ยูนิตที่ควบคุมได้ช่วยเปิดวิสัยทัศน์ รับสกิลบางอย่างแทน หรือบีบให้ศัตรูเปลี่ยนเป้าหมาย", "ใช้เมื่อฮีโร่และแผนทีมเล่นกับยูนิตได้"],
 "Hood of Defiance": ["ทนเวทช่วงต้น", "เพิ่มความทนทานต่อดาเมจเวทเพื่อผ่านช่วงที่ศัตรูพยายามกดดันด้วยสกิล", "เป็นตัวเลือกตามเกมและอาจอัปเกรดต่อ; ไม่ป้องกันการควบคุมทุกชนิด"],
 "Hurricane Pike": ["ดันระยะห่าง", "ผลักให้เกิดระยะห่างจากศัตรูหรือเปิดช่องให้ฮีโร่โจมตีระยะไกล", "ใช้เมื่อศัตรูพุ่งเข้าหรือประชิด; ต้องมีจังหวะกดก่อนโดนควบคุม"],
 "Linken's Sphere": ["บล็อกสกิลล็อกเป้า", "บล็อกสกิลเป้าหมายเดี่ยวหนึ่งครั้งเพื่อกันการเริ่มคอมโบ", "ศัตรูสามารถใช้สกิลอื่นเปิด Linken ก่อน; เลือกเมื่อสกิลเป้าหมายเดี่ยวสำคัญ"],
 "Lotus Orb": ["ล้าง/สะท้อนสกิลเป้า", "ล้างสถานะบางชนิดจากตัวเองหรือเพื่อน และสะท้อนสกิลล็อกเป้าบางอย่าง", "ไม่ได้สะท้อนหรือแก้สกิลทุกชนิด; ใช้เซฟเพื่อนก่อนโดนควบคุม"],
 "Mage Slayer": ["ลดแรงเวทศัตรู", "ช่วยลดความเสียหายเวทที่ทีมรับและเพิ่มความทนต่อเวท", "เหมาะกับฮีโร่ที่เข้าถึงตัวทำเวทได้และทีมต้องการลด burst"],
 "Maelstrom": ["เคลียร์ภาพลวง", "เอฟเฟกต์โจมตีวงกว้างช่วยจัดการภาพลวงหรือยูนิตจำนวนมาก", "คุ้มกับฮีโร่โจมตีเร็ว; ผลขึ้นกับการออกเอฟเฟกต์และการฟาร์ม"],
 "Manta Style": ["ล้างสถานะบางชนิด", "กดสร้างภาพลวงและล้างสถานะพื้นฐานบางชนิดเพื่อหลบการตามต่อ", "ต้องกดทันก่อนถูกล็อก; ไม่ได้ล้างสถานะทุกชนิด"],
 "Mekansm": ["ฟื้นเลือดหมู่", "ช่วยเติมพลังชีวิตและเกราะให้เพื่อนในพื้นที่", "เหมาะกับทีมที่ต้องยืนรวมและรับการ poke; ไม่ใช่ตัวช่วยหนี"],
 "Midas": ["เร่งเศรษฐกิจ", "เพิ่มรายได้และประสบการณ์เพื่อไปถึงไอเทมหลักเร็วขึ้น", "ไม่ใช่ไอเทมแก้ทางโดยตรง; ซื้อเมื่อเกมและตำแหน่งมีเวลาฟาร์ม"],
 "Mjollnir": ["ดาเมจใส่กลุ่มยูนิต", "ช่วยเคลียร์ภาพลวงและลงดาเมจใส่ผู้โจมตีหลายตัว", "เหมาะกับฮีโร่โจมตีเร็วเมื่อเจอภาพลวงหรือยูนิตจำนวนมาก"],
 "Monkey King Bar": ["โจมตีไม่พลาด", "True Strike ช่วยรับมือฮีโร่ที่พึ่งการหลบการโจมตี", "ซื้อเมื่อการหลบเป็นปัญหาจริง; เลือกชิ้นอื่นถ้าทีมขาดกลไกคนละแบบ"],
 "Moon Shard": ["เร่งความเร็วโจมตี", "ช่วยตีเป้าหมายที่ต้องทำลายให้ทันหรือเพิ่มดาเมจโจมตีต่อเนื่อง", "เป็นตัวเลือกตามเกมช่วงท้าย; ไม่ได้เพิ่มการป้องกัน"],
 "Nullifier": ["ลบ buff และเซฟ", "กดลบบัฟบางชนิดต่อเนื่องเพื่อไม่ให้เป้าหมายพึ่งการป้องกันหรือการเซฟ", "เลือกเมื่อศัตรูมีบัฟที่ลบได้; ไม่ได้ลบทุกสกิลติดตัว"],
 "Orchid Malevolence": ["ใบ้และตัดคอมโบ", "หยุดการร่ายสกิลช่วงสั้น ๆ เหมาะกับฮีโร่ที่ต้องใช้สกิลหนีหรือเริ่มไฟต์", "เข้าถึงเป้าหมายให้ได้และระวังการล้างสถานะ"],
 "Pipe of Insight": ["บาเรียร์เวทให้ทีม", "ช่วยทีมรับมือดาเมจเวทแบบพื้นที่หรือคอมโบจากหลายสกิล", "คุ้มเมื่อศัตรูมีเวทหลายตัว; เลือกคนซื้อให้เหมาะกับตำแหน่ง"],
 "Radiance": ["ดาเมจพื้นที่ต่อเนื่อง", "ช่วยทำดาเมจวงกว้างใส่ภาพลวงและยูนิตจำนวนมาก พร้อมสร้างแรงกดดันเมื่ออยู่ใกล้", "ต้องมีฮีโร่ที่ฟาร์มหรือยืนพื้นที่ได้; ไม่ใช่ของแก้ทางเฉพาะทุกเกม"],
 "Rod of Atos": ["รากหยุดการเคลื่อนที่", "ล็อกเป้าหมายที่พึ่งการวิ่งหรือสกิลเคลื่อนที่ เพื่อให้ทีมตามสกิลต่อได้", "ตรวจว่าศัตรูยังถูกล็อกได้หรือไม่และมีตัวล้างสถานะหรือไม่"],
 "Satanic": ["ยืนสวนและฟื้นเลือด", "ช่วยยืนสู้และดูดเลือดกลับเมื่อโจมตีต่อเนื่อง", "ต้องตีถึงเป้าหมาย; ระวังถูกปลดอาวุธหรือคุมก่อนกด"],
 "Scythe of Vyse": ["Hex หยุดตัวสำคัญ", "เปลี่ยนเป้าหมายเป็นสัตว์เพื่อหยุดสกิลหนีและคอมโบในจังหวะสำคัญ", "ต้องเข้าถึงเป้าหมาย; ใช้กับตัวที่ทีมพร้อมโฟกัส"],
 "Shadow Blade": ["เข้าถึงหรือเปลี่ยนตำแหน่ง", "ช่วยซ่อนตัวเพื่อหามุมเข้าหรือถอยออกจากแนวปะทะ", "ศัตรูแก้พรางได้ด้วยการตรวจจับ; อย่าพึ่งไอเทมนี้อย่างเดียว"],
 "Shiva's Guard": ["ชะลอและกดการฟื้น", "ลดความเร็วศัตรูรอบตัวและช่วยกดการฟื้นฟูในไฟต์", "เหมาะกับการยืนใกล้ศัตรูที่ฟื้นเลือดหรือไล่เข้าถึงทีม"],
 "Silver Edge": ["Break ปิด passive", "โจมตีจากพรางตัวเพื่อปิด passive สำคัญของเป้าหมายชั่วคราว", "มีประโยชน์เมื่อ passive เป็นหัวใจของฮีโร่; ต้องเริ่มโจมตีโดนและติดสถานะ Break"],
 "Solar Crest": ["เสริมเกราะทีม", "ช่วยเสริมการรับมือกายภาพและทำให้เพื่อนร่วมทีมยืนสู้หรือโฟกัสเป้าหมายได้ดีขึ้น", "เลือกตามผู้ใช้และชนิดดาเมจ; เป็นไอเทมช่วยทีมมากกว่าหยุดศัตรู"],
 "Spirit Vessel": ["ลดการฟื้นเลือด", "กดลดการฮีลและฟื้นเลือดของเป้าหมายที่พึ่ง sustain", "ต้องมีชาร์จและลง debuff ให้ติด; ศัตรูอาจล้างสถานะได้"],
 "Urn of Shadows": ["กดการฟื้นเลือด", "ใช้ชาร์จใส่เป้าหมายเพื่อลดการฟื้นและกดดันระหว่างไล่ล่า", "ต้องสะสมชาร์จ; Spirit Vessel มักเหมาะกว่าเมื่อเกมยืด"],
 "Vanguard": ["กันการโจมตีช่วงต้น", "ช่วยลดความเสียหายจากการโจมตีปกติและยืนเลนได้นานขึ้น", "มีประโยชน์เมื่อศัตรูพึ่งการโจมตี; ไม่ได้แก้ดาเมจเวท"],
 "Vladmir's Offering": ["ออร่าช่วยทีม", "เพิ่มพลังการยืนสู้และโจมตีของทีมในระยะใกล้", "เลือกเมื่อทีมรวมกลุ่มและได้ประโยชน์จากออร่า; ไม่ใช่กลไกหยุดฮีโร่"],
 "Wind Waker": ["เซฟและล้างสถานะ", "ยกเพื่อนขึ้นเพื่อซื้อเวลา หลบสกิล หรือช่วยออกจากจังหวะอันตราย", "ใช้ให้ทันก่อนถูกควบคุม; ต้องมีผู้เล่นอ่านจังหวะทีมไฟต์"],
 "Magic Wand": ["ฟื้นตัวจากการกดสกิล", "เก็บชาร์จจากสกิลรอบตัวแล้วใช้เติมเลือดและมานาในจังหวะฉุกเฉิน", "เด่นในเลนที่ศัตรูใช้สกิลบ่อยและช่วยรอดจาก burst เล็ก ๆ"],
 "Phase Boots": ["ขยับและไล่จับ", "เพิ่มความคล่องตัวเพื่อหลบการเริ่มไฟต์หรือเข้าถึงตัวทำดาเมจ", "เลือกตามบทบาทและช่วงเลน; ไม่ได้แก้สกิลล็อกเป้าหมาย"],
 "Infused Raindrops": ["กันเวทช่วงต้นเกม", "ช่วยรับดาเมจเวทเป็นจังหวะและยืนเลนได้นานขึ้น", "คุ้มกับเวทที่ลงเป็นก้อน; มีจำนวนชาร์จจำกัด"],
 "Orb of Corrosion": ["กดการฟื้นและไล่ตี", "การโจมตีช่วยชะลอและกดการฟื้นเลือดของเป้าหมาย", "เป็นตัวเลือกช่วงต้นเมื่อฮีโร่เราสามารถตีต่อเนื่อง"],
 "Orb of Frost": ["ลดการฟื้นและไล่ตี", "ช่วยชะลอเป้าหมายและกดการฟื้นจากการโจมตี", "เป็นตัวเลือกตามฮีโร่และช่วงต้นเกม ไม่ใช่ของหลักทุกตำแหน่ง"],
 "Cloak": ["ทนเวทช่วงต้น", "เพิ่มความทนต่อเวทเพื่ออยู่ในเลนหรือผ่านคอมโบแรกของศัตรู", "อัปเกรดตามเกมได้; ไม่ได้แก้สตันหรือใบ้ด้วยตัวเอง"],
 "Ring of Regen": ["ฟื้นเลือดในเลน", "ช่วยรับมือการ poke และยืนเก็บประสบการณ์ในเลนต่อ", "ของเริ่มต้นตามเกม; อย่าซื้อซ้ำซ้อนถ้ามีการฟื้นเพียงพอ"],
 "Headdress": ["ฟื้นเลือดให้เลน", "ช่วยตัวเองและเพื่อนร่วมเลนรับการ poke ต่อเนื่อง", "เป็นตัวเลือกซัพพอร์ตเมื่อศัตรูกดดันด้วยดาเมจเล็ก ๆ ต่อเนื่อง"],
 "Ring of Health": ["ฟื้นเลือดระหว่างยืนเลน", "ช่วยรักษาพลังชีวิตเมื่อถูกกดด้วยการโจมตีหรือสกิลต่อเนื่อง", "ซื้อเมื่อไอเทมนี้ต่อยอดเข้าบิลด์ที่เหมาะกับฮีโร่เรา"],
};

