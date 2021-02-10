const { ReactionCollector } = require('eris-collector');
const Command = require("../../Structures/Command");

module.exports = class EvalCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "unblacklist", 
        aliases: ["maltaunban", "whitelist"],
        description: "Remove usuários que atualmente estão maltaban, eles poderão usar meus comandos de novo (ﾉ^_^)ﾉ",
        usage: "\`[prefix]unban 621810249799827457\`",
        cooldown: 0,
        userperms: ["Somente pessoas especiais"],
        botperms: ["Nenhuma"],
        devOnly: true,
        requerArgs: true
    })
}

async execute(ctx) {
    if(ctx.args[0] === 'server') {

        let Server = this.guilds.get(ctx.args[1]) || this.client.guilds.find(s => s.name.toLowerCase().includes(ctx.args[1].toLowerCase()))
        if(!Server) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum usuário parecido com \`${ctx.args[1].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs, menções ou nomes`)

        let gRes = await this.client.database.guild.findOne({ _id: Server.id })

        if(!gRes) {
            await this.client.database.guild.create({
                _id: Server.id,
            })
            gRes = await this.client.database.guild.findOne({ _id: Server.id }) 
        }

        if(gRes.Blacklist.motivo) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O servidor não está banido`)

        ctx.msg.channel.createMessage(`<:duvida:808660691312705546> \*\*|\*\* Você quer mesmo remover a punção do servidor **${Server.name}** \`(${Server.id})\`?\n<:aviao:808662905444499516> \*\*|\*\* Para confirmar a punição, clique em ✅`).then(async (msg) => {
            msg.addReaction("✅")
            let filter = (m, emoji, userID) => emoji.name === "✅" 
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

        let UserFetch = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0]) || this.client.users.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase()) && ctx.msg.guild.channel.members.has(s.id)) || this.client.getRESTUser(ctx.args[0])

        if(UserFetch instanceof Promise) {
            await UserFetch.then(u => UserFetch = u).catch(e => UserFetch = null)
        }

        if(!UserFetch) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum usuário parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs, menções ou nomes`)

        let uRes = await this.client.database.user.findOne({ _id: UserFetch.id })

        if(!uRes) return ctx.msg.channel.createMessage(`🙅‍♀️ \*\*|\*\* O usuário não está banido`)

            ctx.msg.channel.createMessage(`<:duvida:808660691312705546> \*\*|\*\* Você quer mesmo remover a punição de ${UserFetch.username}#${UserFetch.discriminator}? \`(${UserFetch.id})\`\n<:aviao:808662905444499516> \*\*|\*\* Para confirmar a remoção, clique em ✅`).then(async (msg) => {
                msg.addReaction("✅")
                let filter = (m, emoji, userID) => emoji.name === "✅" 
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