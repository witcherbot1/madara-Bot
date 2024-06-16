let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
await conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}//غير ناروتو و حط اسم بوتك
let pesan = args.join` `
let oi = `*👑~الرساله:* ${pesan}`
let teks = `*𝐍𝐀𝐑𝐔𝐓𝐎↳🤖↲𝐁𝐎𝐓* \n\n ${oi}\n\n*👑┇الجروب :⇣*\n`
for (let mem of participants) {
teks += `*💧↫* @${mem.id.split('@')[0]}\n`}
teks += `\n*𝐍𝐀𝐑𝐔𝐓𝐎↳🤖↲𝐁𝐎𝐓*\n\n*⁨👑𝐻𝐴𝑅𝐿𝐸𝑌 𝐿𝐼𝐺𝐻𝑇👑⁩*`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(منشن|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
export default handler
