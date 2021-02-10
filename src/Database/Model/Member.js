const { Schema } = require("mongoose");

module.exports = new Schema({
    _id: {
        type: String,
        default: null,
    },
    ban: {
        dateban: {
            type: Number,
            default: 0,
        },
    },
    kick: {
        dateKick: {
            type: Number,
            default: 0,
        },
        amountKicks: {
            type: Number,
            default: 0
        },
        lastReason: {
            type: String,
            default: null
        },
    },
    mutes: {
        muteReason: {
            type: String,
            default: null,
        },
        tempMute: {
            type: Number,
            default: 0,
        },
        muteDate: {
            type: Number,
            default: 0,
        },
    },
})