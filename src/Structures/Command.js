module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.commandSettings = {
            name: options.name,
            aliases: options.aliases || [],
            description: options.description || "Not have a description provied",
            usage: options.usage || "Not have a usage provied",
            cooldown: options.cooldown || 3,
            devOnly: options.devOnly || false,
            userperms: options.userperms || [],
            botperms: options.botperms || [],
            requerArgs: options.requerArgs || false
        }
    }
}