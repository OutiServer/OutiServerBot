const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'ping',
        description: 'BotのPing値とメモリ使用率を表示',
        usage: '',
        aliases: [],
        category: 'main',
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
            const msg = await interaction.followUp('Pong!');

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

    /**
     *
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            const used = process.memoryUsage();
            const msg = await message.reply('Pong');

            await message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`APIPing: ${msg.createdTimestamp - message.createdTimestamp}ms\nWebSocketPing: ${client.ws.ping}ms\nメモリ使用率: ${Math.round(used.rss / 1024 / 1024 * 100) / 100}MB`)
                        .setColor('RANDOM')
                        .setTimestamp(),
                ],
            });
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};