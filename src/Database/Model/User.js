const { Schema } = require("mongoose");

module.exports = new Schema({
    _id: {
        type: String,
        default: null,
    },
    Blacklist: {
        motivo: {
            type: String,
            default: null,
        },
        tempBlacklist: {
            type: Number,
            default: 0,
        }, 
        dateBlacklist :{
            type: Number,
            default: 0,
        },
    },
    economy: {
        coins: {
            type: Number,
            default: 0,
        },
        daily: {
            type: Number,
            default: 0,
        },
    }
})