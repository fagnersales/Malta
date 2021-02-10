const { readdir } = require('fs')

module.exports = class CommandsLoader {
    constructor(client) {
        readdir("./src/Commands", (err, f) => {
            if(err) throw new Error("CommandLoader Error: " + err)
            f.forEach(category => {
                readdir(`./src/Commands/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        if(err) throw new Error(err)
                        const Command = require(`../Commands/${category}/${cmd}`)
                        delete require.cache[require.resolve(`../Commands/${category}/${cmd}`)]

                        const command = new Command(client);
                        client.commands.set(command.commandSettings.name, command)

                        command.commandSettings.aliases.forEach(alias => client.aliases.set(alias, command.commandSettings.name))
                    })
                })
            })
        })
    }
}