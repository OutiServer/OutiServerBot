const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'donatu',
        description: 'どーなつ',
        usage: '',
        aliases: [],
        category: 'omake',
    },

    data: new SlashCommandBuilder()
        .setName('donatu')
        .setDescription('どーなつ'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp('https://media.discordapp.net/attachments/906452841890205756/927756490037669938/donatu.webp');
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },

    /**
     *
     * @param {import('../../Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            await message.reply('https://media.discordapp.net/attachments/906452841890205756/927756490037669938/donatu.webp');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};