const { CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "fuck",
        description: "fuckbird",
        usage: "",

        owneronly: false,
        adminonly: false,
        category: 'Omake'
    },

    data: new SlashCommandBuilder()
        .setName('fuck')
        .setDescription('fuckbird'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp({
                content: 'https://media.discordapp.net/attachments/840154191036022794/841298027960729671/fuck.png'
            });
        } catch (error) {
            errorlog(client, interaction, error);
        }
        finally {

        }
    }
}