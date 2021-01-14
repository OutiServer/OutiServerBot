const { Message } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    info: {
        name: "translate",
        description: "翻訳",
        usage: "[元の言語] [翻訳先の言語] [翻訳するテキスト]",
        aliases: ["t"],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 */
    run: async function(client, message, args) {
     const source = encodeURIComponent(args.shift())
     const target = encodeURIComponent(args.shift())
     const text = encodeURIComponent(args.join(' '))
     const content = await fetch(`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${text}&source=${source}&target=${target}`).then(res => res.text())
     message.channel.send(content);
    },
};