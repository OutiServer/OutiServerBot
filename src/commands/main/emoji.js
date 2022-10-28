const { EmbedBuilder, formatEmoji } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'emoji',
        description: '絵文字使用リスト',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('emoji')
        .setDescription('絵文字使用リスト')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle('絵文字使用リストTOP10')
                    .setDescription((await client.database.getAllEmojiUseCount()).map(emoji => `${formatEmoji(emoji.emoji_id)} ${emoji.count}回`).join('\n')),
            ],
        });
    },
};