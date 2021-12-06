const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'delete',
        description: 'メッセージ一括削除',
        usage: '[削除するメッセージ数]',

        owneronly: false,
        adminonly: true,
        category: 'Admin',
    },

    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('メッセージ一括削除')
        .addIntegerOption(option => {
            return option.setName('delete')
                .setDescription('削除するメッセージ数')
                .setRequired(true);
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const messages = await interaction.channel.messages.fetch({ limit: interaction.options.getInteger('delete', true) });
            await interaction.channel.bulkDelete(messages);
            await interaction.channel.send(`${interaction.options.getInteger('delete')} messages is deleted`);
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};