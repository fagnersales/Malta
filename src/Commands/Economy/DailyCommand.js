const Command = require("../../Structures/Command");

module.exports = class DailyCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "daily", 
        aliases: ["dly"],
        description: "Receba sua recompensa diária a cada 24 horas, quem sabe você chegue no top **#1** somente com essas recompensas..",
        usage: "\`[prefix]daily\`",
        cooldown: 3,
        userperms: ["Logar no site pelo menos uma vez na vida"],
        botperms: ["Nenhuma"]
    })
}

async execute(ctx) {
    let uRes = await this.client.database.user.findOne({ _id: ctx.msg.author.id })

    if(!uRes) {
    await this.client.database.user.create({
        _id: ctx.msg.author.id,
    })
    uRes = await this.client.database.user.findOne({ _id: ctx.msg.author.id })
    }

    function randomNumber(min, max) {  
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    let randomAmount = randomNumber(1500, 2500)

    let TimeRes = (parseInt(uRes.economy.daily) + 86400000) - Date.now()

    if ((parseInt(uRes.economy.daily) + 86400000) <= (Date.now())) {
        uRes.economy.coins += randomAmount;
        uRes.economy.daily = Date.now();
        await uRes.save();

        ctx.msg.channel.createMessage(`🍪 \*\*|\*\* Você recebeu \*\*${Number(randomAmount).toLocaleString()} cookies\*\* ao pegar seu daily`)
    } else {
        ctx.msg.channel.createMessage(`<:alarmclock:809212085544288266> \*\*|\*\* Você já pegou seu daily, tente novamente dentro de ${this.formattime.other(TimeRes)}`)
    }
}}
