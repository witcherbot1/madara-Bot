
const handler = async (m, {conn, text, command, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_warn

  if (m.mentionedJid.includes(conn.user.jid)) return;
  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ?
      m.mentionedJid[0] :
      m.quoted ?
      m.quoted.sender :
      text;
  } else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'Sin motivo';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*اعمل تاج او منشن لي الشخص الي عايز تديه انذار ⚠️*\n*مثال:*\n*${
    usedPrefix + command
  } @${global.suittag}*`;
  if (!who) {
    throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  }
  user.warn += 1;
  await m.reply(
      `${
      user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
      } *ابلع في وجهك يا* ${sdms}\n*تم اعطائك انذار ⚠️*\n*الانذارات المعطاه لك يا برو ${
        user.warn
      }/3*`,
      null,
      {mentions: [who]},
  );
  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply(
          `*⚠️ المطور قافل ميزة الطرد لازم هو يفتحها يا حب*`,
      );
    }
    user.warn = 0;
    await m.reply(
        `${tradutor.texto4[0]}\n*@${
          who.split`@`[0]
        }* ${tradutor.texto4[1]}`,
        null,
        {mentions: [who]},
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
  return !1;
};

handler.command = /^(advertir|advertencia|انذار|warning)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
