const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const SQLite = require('better-sqlite3');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'restart',
        description: 'DiscordAPIに再接続し直すコマンド\n接続状況が悪い時はこのコマンドを使おう',
        usage: '',

        owneronly: true,
        adminonly: false,
        category: 'Owner',
    },

    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('DiscordAPIに再接続し直すコマンド\n接続状況が悪い時はこのコマンドを使おう'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp({
                content: '再接続しています...',
            });
            client.db.close();
            client.destroy();
            client.db = new SQLite('outiserver.db');
            await client.login(process.env.DISCORD_TOKEN);
            await interaction.editReply('再接続が完了しました');
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};