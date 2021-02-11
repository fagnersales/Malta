const Command = require("../../Structures/Command");

module.exports = class UserInfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "userinfo", 
        aliases: ["uinfo"],
        description: "Veja algumas informações de algum usuário ou de você mesmo",
        usage: "\`[prefix]userinfo\`\n[prefix]uinfo Luís",
        cooldown: 5,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"],
        requerArgs: false
    })
}

async execute(ctx) {

    let User

    if(!ctx.args[0]) {
        User = ctx.msg.author
    } else {
        ctx.msg.mentions[0] || this.client.users.get(ctx.args[0]) || this.client.users.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase()) && ctx.msg.channel.guild.members.has(s.id)) || this.client.getRESTUser(ctx.args[0])
    }

    if(User instanceof Promise) {
        await User.then(u => User = u).catch(e => User = null)
    }
    if(!User) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum usuário parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por menções, IDs ou nomes`)

    if(ctx.msg.channel.guild.members.has(User.id)) {
        let Member

        if(!ctx.args[0]) {
            Member = ctx.msg.member
        } else {
            Member = ctx.msg.mentions[0] || ctx.msg.channel.guild.members.get(ctx.args[0]) || ctx.msg.channel.guild.members.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase()))
        }

        ctx.msg.channel.createMessage({
            embed: {
                color: 0x586CF5,
                title: `Informações de ${User.username}#${User.discriminator}`,
                thumbnail: {
                    url: User.dynamicAvatarURL()
                },
                fields: [
                    {
                        name: `💻 Discord Tag`,
                        value: `${User.username}#${User.discriminator}`,
                        inline: true
                    },
                    {
                        name: `💻 ID`,
                        value: `\`${User.id}\``,
                        inline: true
                    },
                    {
                        name: `📆 Criado há`,
                        value: `${this.formattime.date(User.createdAt)}`
                    },
                    {
                        name: `⏰ Entrou há`,
                        value: `${this.formattime.date(Member.joinedAt)}`
                    }
                ],
                footer: {
                    text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                    icon_url: ctx.msg.author.dynamicAvatarURL(),
                },
            }
        })
    } else {

    }
}}
