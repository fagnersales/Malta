const Event = require("../Structures/Event");
const CommandContext = require("../Structures/CommandContext")

module.exports = class Handler extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    async run(msg) {
    
    if(msg.author.bot) return;
    if(msg.channel.type === 1) return;

        let gRes = await this.client.database.guild.findOne({ _id: msg.guildID })

        if(!gRes) {
            await this.client.database.guild.create({
                _id: msg.guildID,
                ownerID: msg.channel.guild.ownerID,
            })
            gRes = await this.client.database.guild.findOne({ _id: msg.guildID }) 
        }

        let Prefixo = gRes.Settings.prefix
        if(!Prefixo) return;

        if(msg.content.indexOf(Prefixo) !== 0) return;
        const args = msg.content.slice(Prefixo.length).trim().split(/ +/g);

        let uRes = await this.client.database.user.findOne({ _id: msg.author.id })
        if(uRes) {
            if(uRes.Blacklist.motivo || gRes.Blacklist.motivo) return;
        }

        const Cmd = args.shift().toLowerCase();
        const CmdExec = this.client.commands.get(Cmd) || this.client.commands.get(this.client.aliases.get(Cmd))
        const ctx = new CommandContext(this.client, msg, args)

        if(!CmdExec) return;
        CmdExec.execute(ctx);
    }
}