const { SlashCommandBuilder } = require('@discordjs/builders');
const { Rank } = require('canvacord');
const { AttachmentBuilder } = require('discord.js');
const { existsSync } = require('fs');

module.exports = {
    info: {
        name: 'rank',
        description: '自分のレベルとXPを確認する',
        category: 'level',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('自分のレベルとXPを確認する')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const level = client.database.getLevel(interaction.user.id);
        if (!level) return await interaction.followUp('レベルデータが見つかりませんでした');

        if (existsSync(`./dat/images/rank_${interaction.user.id}.png`)) {
            const image = new Rank()
                .setAvatar(interaction.user.avatarURL({ extension: 'png' }))
                .setBackground('IMAGE', `./dat/images/rank_${interaction.user.id}.png`)
                .setCurrentXP(level.xp)
                .setLevel(level.level)
                .setDiscriminator(interaction.user.discriminator)
                .setRequiredXP(level.level * 55)
                .setUsername(interaction.user.username)
                .setProgressBar(`#${Math.random().toString(16).slice(-6)}`);
            const data = await image.build();
            interaction.followUp({ files: [new AttachmentBuilder(data, 'rank.png')] });
        }
        else {
            const imageNum = Math.floor(Math.random() * 10);
            const image = new Rank()
                .setAvatar(interaction.user.avatarURL({ extension: 'png' }))
                .setBackground('IMAGE', `./dat/images/rank_${imageNum}.png`)
                .setCurrentXP(level.xp)
                .setLevel(level.level)
                .setDiscriminator(interaction.user.discriminator)
                .setRequiredXP(level.level * 55)
                .setUsername(interaction.user.username)
                .setProgressBar(`#${Math.random().toString(16).slice(-6)}`);
            const data = await image.build();
            interaction.followUp({ files: [new AttachmentBuilder(data, 'rank.png')] });
        }
    },
};