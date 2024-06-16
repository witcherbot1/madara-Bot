import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  await conn.sendMessage(m.chat, { react: { text: '🐏', key: m.key } })
 const harley = `https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json`
 const url = await harley[Math.floor(harley.length * Math.random())];
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `alucard`}, body: { text:`مـيـسـي 🇦🇷🐏`,subtitle: "مميزة",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: harley } }, { upload: conn.waUploadToServer }, {quoted: m}))},nativeFlowMessage: { buttons: [

  {
    name: "quick_reply",
    buttonParamsJson: '{"display_text":"𝐌𝐄𝐒𝐒𝐈 🇦🇷","id":".ماء"}'
          }, 
          {
         name: "cta_url",
         buttonParamsJson: '{"display_text":" قــنــاتـي  👑","url":"https://whatsapp.com/channel/0029VaXddtu0lwgiREisx82C","merchant_url":"https://whatsapp.com/channel/0029VaXddtu0lwgiREisx82C"}'},

         ]}}}}},{});}                        
handler.help = ['messi']
handler.tags = ['H A R L E Y']
handler.command = /^(ميسي)$/i
export default handler;
