const { readdir } = require('fs')

module.exports = class EventLoader {
    constructor(client) {
        readdir("./src/Events", (err, files) => {
            if(err) throw new Error("EventLoader Error: " + err)
            files.forEach((filename, info) => {
                const Listener = require('../Events/' + filename)
                delete require.cache[require.resolve('../Events/' + filename)]

                const listener = new Listener(client)

                client.on(listener.name, (...args) => {
                    listener.run(...args)
                })
            })
        })
    }
}