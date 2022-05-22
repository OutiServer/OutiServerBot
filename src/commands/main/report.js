const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
    info: {
        name: 'report',
        description: 'バグを報告したり、Botに対する要望を開発者に送信するコマンド',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('バグを報告したり、Botに対する要望を開発者に送信するコマンド'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const modal = new Modal()
            .setCustomId('report')
            .setTitle('Bot開発者へのバグ報告・要望');
        modal.addComponents(
            new MessageActionRow()
                .addComponents(new TextInputComponent()
                    .setCustomId('report_title')
                    .setLabel('タイトル')
                    .setStyle('SHORT')
                    .setRequired(true),
                ),
            new MessageActionRow()
                .addComponents(new TextInputComponent()
                    .setCustomId('report_content')
                    .setLabel('内容')
                    .setStyle('PARAGRAPH')
                    .setRequired(true),
                ),
        );

        await interaction.showModal(modal);
    },
};