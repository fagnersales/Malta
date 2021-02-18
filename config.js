const { config } = require('dotenv')
const { join } = require("path")
config({
    path: join(__dirname, ".env")
});

module.exports = {
    token: process.env.MALTA_TOKEN,
    owners: JSON.parse(process.env.OWNERS),
    mongo: process.env.MONGO_URI
}
