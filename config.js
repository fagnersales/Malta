const { config } = require('dotenv')
config({
    path: __dirname + "/.env"
});

module.exports = {
    token: process.env.MALTA_TOKEN,
    owners: JSON.parse(process.env.OWNERS),
    mongo: process.env.MONGO_URI
}