const moment = require("moment");
const { ReactionCollector } = require('eris-collector');
const formatTime = require("../../misc/formatTime")
const Command = require("../../Structures/Command");
moment.locale("pt-BR")

module.exports = class BlackListCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "blacklist", 
        aliases: ["maltaban"],
        description: "Impede que usuários teimosos nunca mais possam usar meus comandos",
        usage: "\`[prefix]blacklist 621810249799827457 Algum motivo bem interessante\`",
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

        if(!Server) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum servidor parecido com \`${ctx.args[1].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs ou nomes`);
        let ReasonRefServer = ctx.args.slice(2).join(" ") || `Sem motivo informado`;

        let gRes = await this.client.database.guild.findOne({ _id: Server.id });

        if(!gRes) {
            await this.client.database.guild.create({
                _id: Server.id,
                ownerID: Server.ownerID
            })
            gRes = await this.client.database.guild.findOne({ _id: Server.id }) 
        };

        if(gRes.Blacklist.motivo) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O servidor já está banido\nBanido pelo motivo de:\`${gRes.Blacklist.motivo}\`\nBanido há: ${moment(gRes.Blacklist.dateBlacklist).format('LLLL')} \`(${formatTime(gRes.Blacklist.dateBlacklist)})`)

        let uRes = await this.client.database.user.findOne({ _id: Server.ownerID });

        if(!uRes) {
            await this.client.database.user.create({
                _id: Server.ownerID
            })
            uRes = await this.client.database.user.findOne({ _id: Server.ownerID }) 
        };

        ctx.msg.channel.createMessage(`<:duvida:808660691312705546> \*\*|\*\* Você quer mesmo punir o servidor ${Server.name} \`(${Server.id})\` de \`${this.client.users.get(Server.ownerID).username}#${this.client.users.get(Server.ownerID).discriminator}\`?\n<:aviao:808662905444499516> \*\*|\*\* Para confirmar a punição, clique em ✅`).then(async (msg) => {
            msg.addReaction("✅")
            let filter = (m, emoji, userID) => emoji.name === "✅" 
            let collector = new ReactionCollector(this.client, msg, filter, { time: 60000 });
    
            collector.on("collect", (m, emoji, userID) => {
                if(userID.id != ctx.msg.author.id) return;
                msg.delete();

                gRes.Blacklist.motivo = ReasonRefServer;
                gRes.Blacklist.dateBlacklist = ctx.msg.createdAt;
                gRes.save()

                uRes.Blacklist.motivo = `Ser dono de um servidor que não seguiu as guidlines da Malta`;
                uRes.Blacklist.dateBlacklist = ctx.msg.createdAt;
                uRes.save()
                
                msg.channel.createMessage(`<:check:808661827297738823> \*\*|\*\* Punição concluída com sucesso!`);
            })
        })
    } else {
    
        let UserFetch = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0]) || this.client.users.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase()) && ctx.msg.channel.guild.members.has(s.id)) || this.client.getRESTUser(ctx.args[0]);
        let ReasonRef = ctx.args.slice(1).join(" ") || `Sem motivo informado`;

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

            if(uRes.Blacklist.motivo) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O usuário já está banido\nMotivo: \`${uRes.Blacklist.motivo}\`\nBanido há: ${moment(uRes.Blacklist.dateBlacklist).format('LLLL')} \`(${formatTime(uRes.Blacklist.dateBlacklist)})\``)

            ctx.msg.channel.createMessage(`<:duvida:808660691312705546> \*\*|\*\* Você quer mesmo punir o usuário ${UserFetch.username}#${UserFetch.discriminator} \`(${UserFetch.id})\`?\n<:aviao:808662905444499516> \*\*|\*\* Para confirmar a punição, clique em ✅`).then(async (msg) => {
                msg.addReaction("✅")
            let filter = (m, emoji, userID) => emoji.name === "✅" 
            let collector2 = new ReactionCollector(this.client, msg, filter, { time: 60000 });

            collector2.on("collect", (m, emoji, userID) => {
                if(userID.id != ctx.msg.author.id) return;
                msg.delete();

                uRes.Blacklist.motivo = ReasonRef;
                uRes.Blacklist.dateBlacklist = ctx.msg.createdAt;
                uRes.save()

                msg.channel.createMessage(`<:check:808661827297738823> \*\*|\*\* Punição concluída com sucesso!`);
            })
        })
    }
}}