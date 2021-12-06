const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'exit',
        description: '再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた',
        usage: '',

        owneronly: true,
        adminonly: false,
        category: 'Owner',
    },

    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription('再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp('シャットダウンしています...');
            client.db.close();
            client.connection?.destroy();
            client.destroy();
            process.exit();
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};