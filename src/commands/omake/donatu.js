const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'donatu',
        description: 'どーなつ',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Omake',
    },

    data: new SlashCommandBuilder()
        .setName('donatu')
        .setDescription('どーなつ'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp({
                content: 'https://media.discordapp.net/attachments/876114531418529793/876114710406238308/875912850646925332.png',
            });
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};