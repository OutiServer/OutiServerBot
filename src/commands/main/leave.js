const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'leave',
        description: '読み上げを終わる',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('読み上げを終了する'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.member.voice.channelId) {
                return await interaction.followUp('VCに接続してからこのコマンドを送信してください！');
            }
            else if (!client.connection) {
                return await interaction.followUp('読み上げを開始していません');
            }

            client.connection.destroy();
            client.connection = null;
            client.speekqueue = {};

            await interaction.followUp('読み上げを終了しました');
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
            if (!message.member.voice.channelId) {
                return await message.reply('VCに接続してからこのコマンドを送信してください！');
            }
            else if (!client.connection) {
                return await message.reply('読み上げを開始していません');
            }

            client.connection.destroy();
            client.connection = null;
            client.speekqueue = {};

            await message.reply('読み上げを終了しました');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};