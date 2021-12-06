const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'leave',
        description: '読み上げを終わる',
        usage: '',
        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('読み上げを終了する'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.member.voice.channelId) {
                return await interaction.followUp(
                    {
                        content: 'VCに接続してからこのコマンドを送信してください！',
                        allowedMentions: {
                            repliedUser: false,
                        },
                    },
                );
            }
            else if (!client.connection) {
                return await interaction.followUp(
                    {
                        content: '読み上げを開始していません',
                    },
                );
            }

            client.connection.destroy();
            client.connection = null;
            client.speekqueue = {};

            await interaction.followUp({
                content: '読み上げを終了しました',
            });
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};