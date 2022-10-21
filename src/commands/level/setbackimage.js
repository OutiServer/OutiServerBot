const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { existsSync, unlinkSync, createWriteStream } = require('fs');

module.exports = {
    info: {
        name: 'setbackimage',
        description: 'Rank画像を設定する',
        category: 'level',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('setbackimage')
        .setDescription('Rank画像を設定する')
        .addAttachmentOption(option => option
            .setName('image')
            .setDescription('Rankの背景画像')
            .setRequired(false))
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const image = interaction.options.getAttachment('image', false);
        if (!image) {
            if (!existsSync(`./dat/images/rank_${interaction.user.id}.png`)) return await interaction.followUp('画像が設定されていません');
            unlinkSync(`./dat/images/rank_${interaction.user.id}.png`);
            await interaction.followUp('画像設定をリセットしました');
        }
        else {
            const data = await axios.get(image.attachment, {
                responseType: 'stream',
            });
            data.data.pipe(createWriteStream(`./dat/images/rank_${interaction.user.id}.png`));
            await interaction.followUp('画像を設定しました');
        }
    },
};