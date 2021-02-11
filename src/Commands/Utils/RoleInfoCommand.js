const Command = require("../../Structures/Command");

module.exports = class RoleInfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "roleinfo", 
        aliases: ["rinfo"],
        description: "Mostra algumas informações do cargo escolhido",
        usage: "\`[prefix]roleinfo Membros\`",
        cooldown: 3,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"],
        requerArgs: true
    })
}

async execute(ctx) {

    if(!ctx.args[0]) return;

    let Role = ctx.msg.channel.guild.roles.get(ctx.args[0]) || ctx.msg.channel.guild.roles.get(ctx.msg.roleMentions[0]) || ctx.msg.channel.guild.roles.find(s => s.name.toLowerCase().includes(ctx.args[0].toLowerCase()))

    if(!Role) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum cargo parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por menções, IDs ou nomes`)

    const status = {
        false: "Não",
        true: "Sim"
    }

    let Created = this.formattime.date(Role.createdAt)
    let Id = Role.id

    let Hoisted = status[Role.hoist]
    let Mentionable = status[Role.mentionable]
    let Color = Role.color 

    /*let permsRole = Role.permissions.json;
    let realPerms = [];

    for (const v in permsRole) {
        if(permsRole[v] === false) return;
        realPerms.push(v);
    }

    let PermsFilter = realPerms.map(p => PermissoesJSON[p])*/

    ctx.msg.channel.createMessage({
        embed: {
            color: 0x586CF5,
            title: `Informações de ${Role.name}`,
            fields: [
            {
                name: `💻 Nome`,
                value: `${Role.name}`,
                inline: true
            },
            {
                name: `💻 ID`,
                value: `\`${Id}\``,
                inline: true
            },
            {
                name: `🎨 Cor`,
                value: `#${Color.toString(16).toUpperCase()}`,
                inline: true
            },
            {
                name: `🔖 Mencionável?`,
                value: `${Mentionable}`,
                inline: true
            },
            {
                name: `💼 Exibir separadamente?`,
                value: `${Hoisted}`,
                inline: true
            },
            {
                name: `📆 Data de criação`,
                value: `${Created}`,
                inline: true
            }
        ],
        footer: {
            text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
            icon_url: ctx.msg.author.dynamicAvatarURL(),
        }}
    })
}}