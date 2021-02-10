const { Client } = require('eris');
const MaltaDatabase = require('./Database/MaltaDatabase');
const Loaders = require('./Loaders')

module.exports = class Malta extends Client {
    constructor(token, options = {}, settings) {
        super(token, options);
        
        this.settings = {
            mongo: settings.mongo,
            owners: settings.owners
        }

        this.database = new MaltaDatabase(this.settings.mongo);
        this.commands = new Map();
        this.aliases = new Map();
        this.cooldowns = new Map();
    }

    startLoaders() {
        for(const Loader of Object.values(Loaders)) {
            new Loader(this);
        }
        console.log(`\x1b[36m[${new Date().toUTCString()}] All commands and events were loaded successfully\x1b[0m`)
    }
}