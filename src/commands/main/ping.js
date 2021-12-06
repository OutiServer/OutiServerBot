const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'ping',
        description: 'BotのPing値とメモリ使用率を表示',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('BotのPing値とメモリ使用率を表示'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const used = process.memoryUsage();
            const msg = await interaction.followUp({
                content: 'Pong!',
                allowedMentions: {
                    repliedUser: false,
                },
            });

            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`APIPing: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nWebSocketPing: ${client.ws.ping}ms\nメモリ使用率: ${Math.round(used.rss / 1024 / 1024 * 100) / 100}MB`)
                        .setColor('RANDOM')
                        .setTimestamp(),
                ],
            });
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};