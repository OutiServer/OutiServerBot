const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'set_slot',
        description: 'スロットを追加する or 削除する',
        category: 'admin',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('set_slot')
        .setDescription('スロットを追加する or 削除する')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('スロットチャンネル')
            .setRequired(true),
        )
        .addIntegerOption(option => option
            .setName('slot_type')
            .setDescription('スロットタイプ')
            .addChoices(
                {
                    name: '縦1x横3',
                    value: 0,
                },
                {
                    name: '縦3x横3',
                    value: 1,
                },
                {
                    name: '縦3x横5',
                    value: 2,
                },
            )
            .setRequired(true),
        ),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const channel = interaction.options.getChannel('channel', true);
        const slot = client.database.getSlot(channel.id);
        console.log(slot);
        if (!slot) {
            client.database.addSlot(channel.id, interaction.options.getInteger('slot_type', true));
            await interaction.followUp('スロットを追加しました');
        }
        else {
            client.database.deleteSlot(channel.id);
            await interaction.followUp('スロットを削除しました');
        }
    },
};