const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'outiserverstatus',
        description: 'おうちサーバーの状態を表示するコマンド',
        usage: '',
        aliases: ['oss'],
        category: 'minecraft',
    },

    data: new SlashCommandBuilder()
        .setName('outiserverstatus')
        .setDescription('おうちサーバーの状態を表示する'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp('このコマンドは現在使用できません');
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
            await message.reply('このコマンドは現在使用できません');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};