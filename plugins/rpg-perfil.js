import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `*⚠️ El usuario no se encuentra en mi base de datos*`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[who]
let { name, exp, limit, registered, age, level, role } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
let str = `
]──────❏ *PERFIL* ❏──────[
 *┃💌 𝙉𝙊𝙈𝘽𝙍𝙀:* ${username} ${registered ? '\n*🎐 • Nombre de usuario:* ' + name + ' ': ''}
 *📧 • Tag:* @${who.replace(/@.+/, '')}
 *📞 • Numero:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
 *🔗 • Link:* wa.me/${who.split`@`[0]}${registered ? '\n*🎨 • Edad*: ' + age + ' años' : ''}
 *💎 • Diamantes :* ${limit}
 *📊 • Nivel* : ${level}
 *✨ • XP* : Total ${exp} (${user.exp - min} / ${xp})
 *🏆 • Rango:* ${role}
 *📑 • Registrado :* ${registered ? '✅': '❌'}
 *⭐ • Premium* : ${prem ? '✅' : '❌'}`
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, fkon, false, { mentions: [who]})
 
}
handler.help = ['perfil']
handler.tags = ['group']
handler.command = ['profile', 'perfil'] 

export default handler






/*import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
//let pp = 'https://i.imgur.com/EXTbyyn.jpg'
let pp = await conn.profilePictureUrl('image').catch(_ => './src/avatar_contact.png')
//const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
try {
pp = await conn.getProfilePicture(who)         //pp = await conn.getProfilePicture(who)
} catch (e) {

} finally {
let { name, limit, lastclaim, registered, regTime, age } = global.db.data.users[who]
let username = conn.getName(who)
let user = global.db.data.users[m.sender]
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
let str =
`┃ 𝙉𝙊𝙈𝘽𝙍𝙀 ${name} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᴳᴮ' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙉𝙐𝙈𝙀𝙍𝙊 ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙀𝙉𝙇𝘼𝘾𝙀 wa.me/${who.split`@`[0]}${registered ?'\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 𝙀𝘿𝘼𝘿 ' + age + ' *años*' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙇𝙄𝙈𝙄𝙏𝙀𝙎 *${limit}* 𝙙𝙚 𝙐𝙨𝙤𝙨
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝘼𝘿𝙊(𝘼) ${registered ? '✅': '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 ${prem ? '✅' : '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙉𝙐𝙈𝙀𝙍𝙊 𝘿𝙀 𝙎𝙀𝙍𝙄𝙀
┃ *${sn}*`
conn.sendFile(m.chat, pp, 'perfil.jpg', str, fkon, false, { mentions: [who]})
//conn.sendButton(m.chat, str, wm, await(await fetch(pp)).buffer(), [['𝙑𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙧 | 𝙑𝙚𝙧𝙞𝙛𝙮', '/verificar ✅'], ['𝙌𝙪𝙚 𝙚𝙢𝙥𝙞𝙚𝙘𝙚 𝙡𝙖 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖!! 😎', '/menu']], m)
}}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler*/
