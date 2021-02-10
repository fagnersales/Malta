const Malta = require('./src/Malta')
const config = require('./config')
const MaltaInstance = new Malta(config.token, {
    allowedMentions: {
        everyone: false
    },
    intents: 32767,
    restMode: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048
}, config);

MaltaInstance.startLoaders()
MaltaInstance.connect()