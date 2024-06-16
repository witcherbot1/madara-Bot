//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
*╰━⊰🎏مــبــروك مــســتــوى جــديــد🎏⊱━━დ*
 ┃ *${before}* ‣  *${user.level}*
 ┃ الدور : *${user.role}*
 ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
   𝐻𝐴𝑅𝐿𝐸𝑌 𝐿𝐼𝐺𝐻𝑇
╰━━━〔 *👑 15.4.9* 〕━━━━━⬣
	`.trim())
    }
  }
