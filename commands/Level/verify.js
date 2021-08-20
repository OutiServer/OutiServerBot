const { Message, MessageEmbed, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");
const verify = require('../../dat/json/verify.json');

module.exports = {
    info: {
        name: "verify",
        description: "実績確認",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('実績確認'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
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

            message.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}