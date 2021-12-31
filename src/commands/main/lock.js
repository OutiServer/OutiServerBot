const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'lock',
        description: 'スレッドをロックする',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('スレッドをロックする'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.channel.isThread()) return await interaction.followUp('このコマンドはスレッドチャンネルで使用できます');
            if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && interaction.channel.ownerId !== interaction.user.id) return await interaction.followUp('このスレッドをロックすることはできません');
            await interaction.followUp('このスレッドをロックしました');
            await interaction.channel.setLocked(true, `Locked by ${interaction.user.tag}`);
            client.db.prepare('UPDATE  threads SET locked = ? WHERE threadid = ?;').run(1, interaction.channelId);
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
            if (!message.channel.isThread()) return await message.reply('このコマンドはスレッドチャンネルで使用できます');
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && message.channel.ownerId !== message.user.id) return await message.reply('このスレッドをロックすることはできません');
            await message.reply('このスレッドをロックしました');
            await message.channel.setLocked(true, `Locked by ${message.author.tag}`);
            client.db.prepare('UPDATE  threads SET locked = ? WHERE threadid = ?;').run(1, message.channelId);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};