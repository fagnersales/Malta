const { Schema } = require("mongoose");

module.exports = new Schema({
    _id: {
        type: String,
        default: null,
    },
    ownerID: {
        type: String,
        default: null
    },
    Blacklist: {
        motivo: {
            type: String,
            default: null,
        },
        tempBlacklist : {
            type: Number,
            default: 0,
        },
        dateBlacklist: {
            type: Number,
            default: 0,
        }
    },
    Settings: {
        permMotivo: {
            type: Boolean,
            default: false,
        },
        recommendSettings: {
            type: Boolean,
            default: false,
        },
        EventLog: {
            type: String,
            default: null,
        },
        Modlog: {
            type: String,
            default: null,
        },
        prefix: {
            type: String,
            default: "..",
        },
        CmdChannels: {
            type: Array,
            default: null
        },
        sendDm: {
            type: Boolean,
            default: false,
        },
    },
    BansConfigs: {
        logs: {
            type: String,
            default: null,
        },
        sendDM: {
            type: Boolean,
            default: false
        },
        clearMessages: {
            type: Number,
            default: 0,
        }
    },
    kickConfigs: {
        logs: {
            type: String,
            default: null,
        },
        sendDm: {
            type: Boolean,
            default: false
        },
    },
    muteConfigs: {
        logs: {
            type: String,
            default: null,
        },
        sendDM: {
            type: Boolean,
            default: false
        },
        MuteRole: {
            type: String,
            default: null,
        },
    },
})