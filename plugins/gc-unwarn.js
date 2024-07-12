

const handler = async (m, {conn, text, command, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_unwarn

  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const warntext = `*اعمل تاج او منشن لي الشخص الي عايز ترفع عنه الانذار*\n*مثال:* \n*${usedPrefix + command} @${global.suittag}*`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warn == 0) throw tradutor.texto2;
  user.warn -= 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ @${who.split`@`[0]}`} *تم الغاء الانذار عنك خليك راجل بقا واعمل غلط تاني هفشخك*\n*عدد الانذارات المتبقية عليك ${user.warn}/3*`, null, {mentions: [who]});
};
handler.command = /^(unwarn|رفع_انذار|الغاء_انذار|deladvertencia|delwarning)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
