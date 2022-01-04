const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'fuck',
        description: 'fuckbird',
        usage: '',
        aliases: [],
        category: 'omake',
    },

    data: new SlashCommandBuilder()
        .setName('fuck')
        .setDescription('fuckbird'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp('https://media.discordapp.net/attachments/840154191036022794/841298027960729671/fuck.png');
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },

    /**
     *
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            await message.reply('https://media.discordapp.net/attachments/840154191036022794/841298027960729671/fuck.png');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};