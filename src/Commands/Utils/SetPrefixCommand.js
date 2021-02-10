const Command = require("../../Structures/Command");

module.exports = class SetPrefixCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "setprefix", 
        aliases: ["editprefix", "changeprefix"],
        description: "Mude meu prefixo de acordo com o seu gosto ou necessidade do seu servidor",
        usage: "\`[prefix]setprefix m!\`",
        cooldown: 5,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"],
        requerArgs: true
    })
}

async execute(ctx) {
    let gRes = await this.client.database.guild.findOne({ _id: ctx.msg.guildID })
        
    let Prefixo = gRes.Settings.prefix
    if(!Prefixo) return;

    if(!ctx.msg.member.permissions.has('manageGuild')) return ctx.msg.channel.createMessage(`Você não tem permissões suficientes para poder executar esse comando! Na próxima vez, tente com permissões de \`Gerenciar servidor\``)
            
    let NewPrefix = ctx.args[0];

    if(NewPrefix.length > 4) return ctx.msg.channel.createMessage(`Isso é muito longo! Provavelmente ninguém utilizaria um prefixo com mais de 4 caracteres`)

    if(!/\w{0,4}([!?:;><.,=+_*&$#"'/|-])/g.test(NewPrefix)) return ctx.msg.channel.createMessage(`Parece que não conheço esses tipos de caracteres, tente caraceteres mais fáceis de lembrar`)

    if(NewPrefix === Prefixo) return ctx.msg.channel.createMessage(`Pelo que eu saiba esse já é o prefixo do servidor. Talvez funcione se você por um diferente desse`)
    
    ctx.msg.channel.createMessage(`🎉 \*\*|\*\* Sucesso! O prefixo foi alterado para \`${NewPrefix}\`. Lembrando que, só irei responder mensagens que tenham esse novo prefixo`).then(() => {
        gRes.Settings.prefixo = NewPrefix
        gRes.save()
    })
}}