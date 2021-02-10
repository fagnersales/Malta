const { inspect } = require("util");
const Command = require("../../Structures/Command");

module.exports = class EvalCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "eval", 
        aliases: ["ev"],
        description: "Executa curtos scripts em javascript, usando a livraria Eris",
        usage: "\`[prefix]eval this.client\`",
        cooldown: 0,
        userperms: ["Somente pessoas especiais"],
        botperms: ["Nenhuma"],
        devOnly: true,
        requerArgs: true
    })
}

async execute(ctx) {
    if(![ctx.msg.author.id].includes("621810249799827457")) return
    let input = ctx.args.join(" "),
    hasAwait = input.includes("await"),
    hasReturn = input.includes("return"),
    evaled

    try {
        evaled = hasAwait ? await eval(`(async () => { ${hasReturn ? " " : "return"} ${input} })()`) : eval(input);
        if(typeof evaled != "string"){
            evaled = inspect(evaled, {
                depth: +!(inspect(evaled, { depth: 2 }))
            });
        }
    } catch(err) {
        evaled = err;
    }

    evaled = evaled.toString();

    evaled = evaled.split(process.env.MALTA_TOKEN).join("XXX");

    if(evaled.length > 1900) evaled = evaled.slice(0, 1900);

    ctx.msg.channel.createMessage(`\`\`\`js\n${evaled}\`\`\``)
}}