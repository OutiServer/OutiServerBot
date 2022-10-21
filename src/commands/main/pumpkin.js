/* eslint-disable no-irregular-whitespace */
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'pumpkin',
        description: 'カボチャ',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('pumpkin')
        .setDescription('カボチャ')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp(`₍₍(ง🎃)ว⁾⁾
        鳴らない言葉をもう一度描いて
        ₍₍ᕦ(🎃)ᕤ⁾⁾　₍₍ʅ(🎃)ว⁾⁾
        ₍₍🙏⁾⁾
        ₍₍🎃⁾⁾
        赤色に染まる時間を置き忘れ去れば
        ₍₍₍(ง🎃)ว⁾⁾⁾
        哀しい世界はもう二度となくて
        ₍₍ᕦ(🎃)ᕤ⁾⁾　₍₍ʅ(🎃)ว⁾⁾
        🙏
        🎃
        荒れた陸地が こぼれ落ちていく
        ₍₍ ʅ(🎃) ʃ ⁾⁾
        一筋の光へ`);
    },
};