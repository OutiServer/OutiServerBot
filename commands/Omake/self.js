const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "self",
        description: "selfbot検知しました",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Omake'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            message.channel.send(
                {
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`<@${message.author.id}>さん、selfbot検知しました\n問答無用で永BANです＾＾`)
                            .setColor('RANDOM')
                            .setTimestamp()
                    ],
                    allowedMentions: {
                        repliedUser: false
                    }
                }
            ).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}