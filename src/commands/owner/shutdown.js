const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'shutdown',
        description: '再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた',
        usage: '',
        aliases: [],
        category: 'owner',
    },

    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた'),

    /**
     * @param {import('../../Bot')} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp('シャットダウンしています...');
            process.exit();
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
            await message.reply('シャットダウンしています...');
            process.exit();
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};