const { connect, model } = require('mongoose')

module.exports = class MaltaDatabase {
    constructor(uri) {
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }
        
        connect(uri, options, err => {
            if(err) throw new Error("MongoDB Error: " + err);
            console.log(`\x1b[36m[${new Date().toUTCString()}] MongoDB connected with success\x1b[0m`);
        })

        return {
            ...this,
            user: model("User", require('./Model/User')),
            guild: model("Guild", require('./Model/Guild')),
            member: model("Member", require('./Model/Member'))
        }
    }
}