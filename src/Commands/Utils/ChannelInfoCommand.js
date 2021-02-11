const Command = require("../../Structures/Command");

module.exports = class ChannelInfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "channelinfo", 
        aliases: ["chinfo"],
        description: "Mostra informações de algum canal ou do canal que foi executado",
        usage: "\`[prefix]channelinfo\`",
        cooldown: 3,
        userperms: ["Nenhuma"],
        botperms: ["Nenhuma"]
    })
}

async execute(ctx) {
    let Channel

    if(!ctx.args[0]) {
        Channel = ctx.msg.channel
    } else {
        Channel = this.client.getChannel(ctx.msg.channelMentions[0]) || this.client.getChannel(ctx.args[0])
    }

    if(!Channel) return ctx.msg.channel.createMessage(`<:lupa:808665984616759306> \*\*|\*\* Procurei, procurei, mas não achei nenhum canal parecido com \`${ctx.args[0].replace(/`/g, '').slice(0, 200)}\`, nem mesmo por menções ou IDs`)
    
    const boolean = {
        true: "Sim",
        false: "Não",
        null: "Nenhum",
        undefined: "Não"
    }

    let Name = Channel.name;
    let Created = this.formattime.date(Channel.createdAt);
    let Nsfw = boolean[Channel.nsfw];
    let Id = Channel.id;
    let Topic = Channel.topic ? Channel.topic : `Nenhum`;
    let Slowmode = Channel.rateLimitPerUser;

    switch(Channel.type) {
        case 0 && 5 && 6:
        ctx.msg.channel.createMessage({
            embed: {
                color: 0x586CF5,
                title: `Informações de ${Name}`,
                fields: [
                    {
                        name: `💻 Nome`,
                        value:`${Name}`,
                        inline: true
                    },
                    {
                        name: `💻 ID`,
                        value: `\`${Id}\``,
                        inline: true
                    },
                    {
                        name: `🔞 Nsfw?`,
                        value: `${Nsfw}`,
                        inline: true
                    },
                    {
                        name: `🐌 SlowMode`,
                        value: `${Slowmode} segundos`,
                        inline: true
                    },
                    {
                        name: `📑 Tópico`,
                        value: `${Topic}`
                    },
                    {
                        name: `📆 Criado há`,
                        value: `${Created}`
                    }
                ],
                footer: {
                    text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                    icon_url: ctx.msg.author.dynamicAvatarURL(),
                }}
            })
        break;

        case 2:
            let BitRate = Channel.bitrate;
            let UserLimit = Channel.userLimit;
            let Voicemembers = Channel.voiceMembers.map(a => `\`${a.user.username}#${a.user.discriminator}\``).slice(0, 15).join(" | ") ? Channel.voiceMembers.map(a => `\`${a.user.username}#${a.user.discriminator}\``).slice(0, 15).join(" | ") : `Nenhum`;

        ctx.msg.channel.createMessage({
            embed: {
                color: 0x586CF5,
                title: `Informações de ${Name}`,
                fields: [
                    {
                        name: `💻 Nome`,
                        value:`${Name}`,
                        inline: true
                    },
                    {
                        name: `💻 ID`,
                        value: `\`${Id}\``,
                        inline: true
                    },
                    {
                        name: `📡 Taxa de BITS`,
                        value: `${BitRate / 1000}`,
                        inline: true
                    },
                    {
                        name: `👤 Limite de usuários`,
                        value: `${UserLimit} usuários`,
                        inline: true
                    },
                    {
                        name: `👥 Usuários`,
                        value: `${Voicemembers}`,
                    },
                    {
                        name: `📆 Criado há`,
                        value: `${Created}`
                    }
                ],
                footer: {
                    text: `${msg.author.username}#${msg.author.discriminator}`,
                    icon_url: msg.author.dynamicAvatarURL(),
                }}
            })
        break;

        case 4:
        ctx.msg.channel.createMessage({
            embed: {
                color: 0x586CF5,
                title: `Informações de ${Name}`,
                fields: [
                    {
                        name: `💻 ID`,
                        value: `\`${Id}\``,
                        inline: true
                    },
                    {
                        name: `💻 Nome`,
                        value:`${Name}`,
                        inline: true
                    },
                    {
                        name: `📆 Criado há`,
                        value: `${Created}`
                    }
                ],
                footer: {
                    text: `${ctx.msg.author.username}#${ctx.msg.author.discriminator}`,
                    icon_url: ctx.msg.author.dynamicAvatarURL(),
                }}
            })
        break;
    }
}}