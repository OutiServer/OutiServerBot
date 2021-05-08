const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require('../../functions/error');
const verify = require('../../dat/json/verify.json');

module.exports = {
    info: {
        name: "verify",
        description: "実績",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            const embed = new MessageEmbed()
                .setTitle('あなたが解除している実績')
                .setColor('RANDOM')
                .setTimestamp();

            for (let i = 0; i < verify.length; i++) {
                if (client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, i)) {
                    embed.addField(verify[i].name, verify[i].description);
                }
            }

            message.channel.send(embed);
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}