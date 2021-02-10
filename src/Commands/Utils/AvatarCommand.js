const Command = require("../../Structures/Command");

module.exports = class AvatarCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "avatar", 
        aliases: ["uicon", "usericon", "av"],
        description: "Mostra o avatar do usuário ou o seu, se você quiser pode até baixá-lo",
        usage: "\`[prefix]avatar\`\n\`[prefix]uicon Luís\`",
        cooldown: 3,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"]
    })
}

async execute(ctx) {
    let User

    if(!ctx.args[0]) {
        User = ctx.msg.author
    } else {
        User = ctx.msg.mentions[0] || this.client.users.get(ctx.args[0]) || this.client.users.find(s => s.username.toLowerCase().includes(ctx.args[0].toLowerCase())) || this.client.getRESTUser(ctx.args[0])
    }

    if(User instanceof Promise) {
        await User.then(u => User = u).catch(e => User = null)
    }
    
    if(!User) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum usuário parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por menções, IDs ou nomes`)

    ctx.msg.channel.createMessage({
        embed: {
            color: 0x586CF5,
            title: `Avatar de ${User.username}#${User.discriminator}`,
            description: `\*\*[Clique aqui](${User.dynamicAvatarURL()})\*\* para baixar!`,
            image: {
                url: User.dynamicAvatarURL()
            },
            footer: {
                text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                icon_url: ctx.msg.author.dynamicAvatarURL(),
            }
        }
    })
}}