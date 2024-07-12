import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `*✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي*`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './views/img/avatar_contact.png')
let user = global.db.data.users[who]
let { name, exp, credit, bank, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')


let str = `*┌───⊷﹝بــروفــايــل﹞⊷*
*▢〉🔖‣  الأســـــم :* 
*•* ${registered ? '' + name + ' ': ''}
*• @${who.replace(/@.+/, '')}*
*🔗 : wa.me/${who.split`@`[0]}*
*▢〉📱‣ : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}*
${registered ? '*▢〉🎈‣ عـــمـــر:' + age + 'ســـنـــوات*' : ''}
*▢〉📇‣ مـــســـجـــل : ${registered ? '✅' : '❌'}*
*└──────────────────⊷*`
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false, { mentions: [who] })

}
handler.help = ['perfil']
handler.tags = ['group']
handler.command = ['عني','بروفايل','profile','بروفايلي','perfil']

export default handler
