const { ReactionCollector } = require('eris-collector');
const Command = require("../../Structures/Command");

module.exports = class BlackListInfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "blacklistinfo", 
        aliases: ["maltabaninfo"],
        description: "Mostra informações importantes relacionadas ao banimento de algum usuário",
        usage: "\`[prefix]blacklistinfo 621810249799827457\`",
        cooldown: 0,
        userperms: ["Somente pessoas especiais"],
        botperms: ["Nenhuma"],
        devOnly: true,
        requerArgs: true
    })
}

async execute(ctx) {
    if(ctx.args[0] === 'server') {

        let Server = this.client.guilds.get(ctx.args[1]) || this.client.guilds.find(s => s.name.toLowerCase().includes(ctx.args[1].toLowerCase()))
        if(!Server) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum servidor parecido com \`${ctx.args[1].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs ou nomes`)

        let gRes = await this.client.database.guild.findOne({ _id: Server.id })

        if(!gRes) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O servidor não está banido`)

        let Reason = gRes.Blacklist.motivo;
        let BanDate = gRes.Blacklist.dateBlacklist;
    
        ctx.msg.channel.createMessage({
        embed: {
            color: 0x586CF5,
            title: `👮‍♂️ Blacklist de ${Server.name} | \`${Server.id}\``,
            thumbnail: { 
                url: Server.dynamicIconURL(),
            },
            fields: [
                {
                    name: `📄 Motivo do banimento`,
                    value: `\`${Reason}\``
                },
                {
                    name: `📆 Banido há`,
                    value: `${this.formattime.date(parseInt(BanDate))}`,
                }
            ],
            footer: {
                text: 'Reaja com 🛠️ para desbanir'
            }
        }}).then(async (msg) => {
        msg.addReaction("🛠️")
        let filter = (m, emoji, userID) => emoji.name === "🛠️" 
        let collector = new ReactionCollector(this.client, msg, filter, { time: 60000 });

            collector.on("collect", (m, emoji, userID) => {
                if(userID.id != ctx.msg.author.id) return;
                msg.delete();

                gRes.Blacklist.motivo = null;
                gRes.Blacklist.dateBlacklist = 0;
                gRes.save()

                msg.channel.createMessage(`<:check:808661827297738823> \*\*|\*\* Punição removida com sucesso!`);
            })
        })
    } else {
    
        let UserFetch = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0]) || this.client.users.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase()) && ctx.msg.channel.guild.members.has(s.id)) || this.client.getRESTUser(ctx.args[0])

        if(UserFetch instanceof Promise) {
            await UserFetch.then(u => UserFetch = u).catch(e => UserFetch = null)
        }

        if(!UserFetch) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum usuário parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por menções, IDs ou nomes`)

        let uRes = await this.client.database.user.findOne({ _id: UserFetch.id })

        if(!uRes) {
            await this.client.database.user.create({
                _id: UserFetch.id,
            })
        uRes = await this.client.database.user.findOne({ _id: UserFetch.id }) 
        }

        if(!uRes.Blacklist.motivo) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O usuário não está banido.`)

        let BanReason = uRes.Blacklist.motivo;
        let BanDate = uRes.Blacklist.dateBlacklist;
    
        ctx.msg.channel.createMessage({
            embed: {
                color: 0x586CF5,
                title: `👮‍♂️ Blacklist de ${UserFetch.username}#${UserFetch.discriminator} | \`${UserFetch.id}\``,
                author: {
                    name: `${ctx.msg.author.tag}`,
                    icon_url: ctx.msg.author.dynamicAvatarURL(),
                },
                thumbnail: { 
                    url: UserFetch.dynamicAvatarURL(),
                },
                fields: [
                    {
                        name: `Motivo do banimento`,
                        value: `\`${BanReason}\``
                    },
                    {
                        name: `Banido há`,
                        value: `${formatTime(parseInt(BanDate))}`,
                    }
                ],
                footer: {
                    text: 'Reaja com 🛠️ para desbanir'
                }
            }
        }).then(async (msg) => {
            msg.addReaction("🛠️")
            let filter = (m, emoji, userID) => emoji.name === "🛠️" 
            let collector2 = new ReactionCollector(this.client, msg, filter, { time: 60000 });

            collector2.on("collect", (m, emoji, userID) => {
                if(userID.id != ctx.msg.author.id) return;
                msg.delete();

                uRes.Blacklist.motivo = null;
                uRes.Blacklist.dateBlacklist = 0;
                uRes.save()

                msg.channel.createMessage(`<:check:808661827297738823> \*\*|\*\* Punição removida com sucesso!`);
            })
        })
    }
}}