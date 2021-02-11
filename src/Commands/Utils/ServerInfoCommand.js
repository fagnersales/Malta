const Command = require("../../Structures/Command");

module.exports = class ServerInfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "serverinfo", 
        aliases: ["sinfo", "guildinfo"],
        description: "Mostra informações do servidor que você está ou de algum que eu esteja",
        usage: "\`[prefix]serverinfo\`",
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

        let Members = Server.memberCount;
        let Bots = Server.members.filter(a => a.user.bot).length;
        let Humans = Server.members.filter(a => !a.user.bot).length;
        let Channels = Server.channels.size;
        let Text = Server.channels.filter(a => a.type === 0).length;
        let Voice = Server.channels.filter(a => a.type === 2).length;
        let Category = Server.channels.filter(a => a.type === 4).length;
        let Announce = Server.channels.filter(a => a.type === 5).length;

        let Description
        if(Server.description) {
            Description = `${Server.description}`
        } else {
            Description = ``
        }

        let Splash
        if(Server.dynamicSplashURL()) {
            Splash = `${Server.dynamicSplashURL()}`
        } else {
            Splash = ``
        }

        const região = {
            brazil: 'Brasil :flag_br:'
        }

        let ServerReg = região[Server.region];
        let SvLevel = Server.premiumTier === 1 ? `| <:Booster:782920068245094400>` : Server.premiumTier === 2 ? `| <:Booster:782920068245094400>` : Server.premiumTier === 3 ? `| <:Booster:782920068245094400>` : ''
        let Created = this.formattime.date(Server.createdAt)
    
        ctx.msg.channel.createMessage({
            embed: {
                title: `Informações de ${Server.name} ${SvLevel}`,
                color: 0x586CF5,
                description: Description,
                thumbnail: {
                    url: Server.dynamicIconURL()
                },
                image: {
                    url: `${Splash}`
                },
                fields: [
                    {
                        name: `💻 Nome`,
                        value: `\`${Server.name}\``,
                        inline: true
                    },
                    {
                        name: `💻 ID`,
                        value: `\`${Server.id}\``,
                        inline: true
                    },
                    {
                        name: `👑 Criador`,
                        value: `${ctx.msg.channel.guild.members.get(Server.ownerID).username}#${ctx.msg.channel.guild.members.get(Server.ownerID).discriminator}`,
                        inline: false
                    },
                    {
                        name: `👑 ID`,
                        value: `\`${Server.ownerID}\``,
                        inline: true
                    },
                    {
                        name: `Canais [${Channels}]`,
                        value: `📄 Texto \*\*[${Text}]\*\*\n🔊 Voz \*\*[${Voice}]\*\*\n📣 Canais de anúncio \*\*[${Announce}]\*\*\n🔖 Categorias \*\*[${Category}]\*\*`,
                    },
                    {
                        name: `Membros [${Members}]`,
                        value: `👥 Humanos \*\*[${Humans}]\*\*\n🤖 Bots \*\*[${Bots}]\*\*`,
                        inline: true
                    },
                    {
                        name: `🌎 Região`,
                        value: `${ServerReg}`,
                    },
                    {
                        name: `📆 Criado há`,
                        value: `${Created}`,
                        inline: true
                    }
                ],
                footer: {
                    text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                    icon_url: ctx.msg.author.dynamicAvatarURL(),
                },
            }
        })
    }
}