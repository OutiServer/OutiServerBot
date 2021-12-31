const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'unlock',
        description: 'スレッドのロックを解除する',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('スレッドのロックを解除する'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.channel.isThread()) return await interaction.followUp('このコマンドはスレッドチャンネルで使用できます');
            if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && interaction.channel.ownerId !== interaction.user.id) return await interaction.followUp('このスレッドのロック解除することはできません');
            await interaction.channel.setLocked(false, `UnLocked by ${interaction.user.tag}`);
            await interaction.followUp('このスレッドのロックを解除しました');
            client.db.prepare('UPDATE  threads SET locked = ? WHERE threadid = ?;').run(0, interaction.channelId);
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
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && message.channel.ownerId !== message.user.id) return await message.reply('このスレッドのロック解除することはできません');
            await message.reply('このスレッドのロックを解除しました');
            await message.channel.setLocked(false, `UnLocked by ${message.author.tag}`);
            client.db.prepare('UPDATE  threads SET locked = ? WHERE threadid = ?;').run(0, message.channelId);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};