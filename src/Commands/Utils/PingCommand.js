const Command = require("../../Structures/Command");

module.exports = class PingCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "ping", 
        aliases: ["lag", "latencia", "latency"],
        description: "Mostra a minha latência (ping) em tempo real",
        usage: "\`[prefix]ping\`",
        cooldown: 3,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"]
    })
}

async execute(ctx) {
    ctx.msg.channel.createMessage(`📡 **|** API ping - **${ctx.msg.channel.guild.shard.latency}ms**\n🔹 **|** Latência - **/ ms**`).then(response => {
        response.edit(`📡 **|** API ping - **${ctx.msg.channel.guild.shard.latency}ms**\n🔹 **|** Latência - **${response.createdAt - ctx.msg.createdAt}ms**`)
    })
}}