const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'ping',
        description: 'BotのPing値とメモリ使用率を表示',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('BotのPing値とメモリ使用率を表示')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const used = process.memoryUsage();
        const msg = await interaction.followUp('Pong!');

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`APIPing: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nWebSocketPing: ${client.ws.ping}ms\nメモリ使用率: ${(Math.round(used.rss / 1024 / 1024 * 100) / 100)}MB`)

                    .setTimestamp(),
            ],
        });
    },
};