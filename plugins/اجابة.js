import similarity from 'similarity'

const threshold = 0.72
const dollar = 500 // تحديد قيمة الجائزة هنا

export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/استخدم.*انسحب/i.test(m.quoted.text) || /.*hhint/i.test(m.text)) {
        return !0
    }

    this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}

    if (!(id in this.tebakbendera)) {
        return this.reply(m.chat, 'الــســؤال خــلــص يــا احــول🐤', m)
    }

    if (m.quoted.id == this.tebakbendera[id][0].id) {
        let isSurrender = /^(انسحب|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
            return this.reply(m.chat, 'طلع فاشل و استسلم :( !', m)
        }

        let json = this.tebakbendera[id][1]

        if (m.text.toLowerCase() === json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].dollar += this.tebakbendera[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n\n*❐↞┇الـجـائـزة💰↞${this.tebakbendera[id][2]} دولار 💵*`, m)
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) {
            m.reply('*لقد كنت علي وشك النجاح*!')
        } else {
            this.reply(m.chat, '❐┃اجـابـة خـاطـئـة يــا بــاكــا┃❌ ❯', m)
        }
    }
    return !0
}
