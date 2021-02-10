const Command = require("../../Structures/Command");

module.exports = class GuildIconCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "guildicon", 
        aliases: ["gicon"],
        description: "Veja a foto do servidor",
        usage: "\`[prefix]guildicon\`",
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

    if(!Server) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum servidor parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por IDs ou nomes`)

    let ServerIcon = Server.dynamicIconURL()

    if(!ServerIcon) return ctx.msg.channel.createMessage(`Procurei, mas não achei nenhuma foto do servidor \`${ctx.args[0].replace(/`/g, '')}\``)
    
    ctx.msg.channel.createMessage({
        embed: {
            color: 0x586CF5,
            title: `Icon de ${Server.name}`,
            description: `\*\*[Clique aqui](${ServerIcon})\*\* para baixar!`,
            image: {
                url: ServerIcon,
            },
            footer: {
                text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                icon_url: ctx.msg.author.dynamicAvatarURL(),
            }
        }
    })
}}