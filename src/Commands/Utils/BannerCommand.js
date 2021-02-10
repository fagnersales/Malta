const Command = require("../../Structures/Command");

module.exports = class BannerCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "banner", 
        description: "Mostra o banner do servidor",
        usage: "\`[prefix]banner\`\n\`[prefix]banner 759508343286530109",
        cooldown: 3,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"]
    })
}

async execute(ctx) {
    let Server

    if(!ctx.args[0]) {
        Server = ctx.msg.channel.guild
    } else {
        Server = this.client.guilds.get(ctx.args[0]) || this.client.guilds.find(s => s.name.toLowerCase().includes(ctx.args[0].toLowerCase()))
    }

    if(!Server) return ctx.msg.channel.createMessage(`Procurei, procurei, mas não achei nenhum servidor parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs ou nome`)

    let ServerBanner = ServerBanner.dynamicBannerURL()

    if(!ServerBanner) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum servidor parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs ou nomes`)
    
    ctx.msg.channel.createMessage({
        embed: {
            color: 0x586CF5,
            title: `Banner de ${Server.name}`,
            description: `\*\*[Clique aqui](${ServerBanner})\*\* para baixar!`,
            image: {
                url: ServerBanner,
            },
            footer: {
                text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                icon_url: ctx.msg.author.dynamicAvatarURL(),
            }
        }
    })
}}