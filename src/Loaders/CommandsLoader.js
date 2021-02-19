const { readdirSync } = require('fs')

module.exports = class CommandsLoader {
    constructor(client) {
        const categoriesPath = "./src/Commands";

        const categories = readdirSync(categoriesPath);
        if (!categories) throw new Error(`CommandLoader Error: No such file on '${categoriesPath}'`);

        const forEachCategory = (category) => {

            const forEachCommand = (command) => {
                const Command = require(`../Commands/${category}/${command}`);

                delete require.cache[require.resolve(`../Commands/${category}/${command}`)];

                const command = new Command(client);
                client.commands.set(command.commandSettings.name, command);

                command.commandSettings.aliases.forEach(alias => client.aliases.set(alias, command.commandSettings.name));
            }

            const commandsPath = `./src/Commands/${category}`;

            const commands = readdirSync(commandsPath);
            if (!commands) return console.log(`CommandLoader Warn: Category '${category}' is empty`);

            commands.forEach(forEachCommand);
        }

        categories.forEach(forEachCategory);
    }
}