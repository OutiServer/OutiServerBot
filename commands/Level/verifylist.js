const { Message, MessageEmbed, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");
const verify = require('../../dat/json/verify.json');

module.exports = {
    info: {
        name: "verifylist",
        description: "全実績確認",
        usage: "",

        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    data: new SlashCommandBuilder()
        .setName('verifylist')
        .setDescription('全実績確認'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const embed = new MessageEmbed()
                .setTitle('おうち鯖にある全ての実績')
                .setColor('RANDOM')
                .setTimestamp();

            for (let i = 0; i < verify.length; i++) {
                embed.addField(verify[i].name, verify[i].description);
            }

            await interaction.followUp(
                {
                    embeds: [
                        embed
                    ]
                }
            );
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {

        }
    }
}