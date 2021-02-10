module.exports = class CommandContext {
    constructor(client, msg, args) {
        this.client = client;
        this.msg = msg;
        this.args = args;
      }
}