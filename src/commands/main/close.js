const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'close',
        description: 'お問合せ・スレッドクローズ',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('お問合せ・スレッドクローズ'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (interaction.channel.parentId !== '821684794056245258' && !interaction.channel.isThread()) return await interaction.followUp({ content: 'そのコマンドはお問い合わせカテゴリー・スレッドでのみ使用できます' });
            if (interaction.channel.parentId === '821684794056245258') {
                const inquirys = client.db.prepare('SELECT * FROM inquirys WHERE channelid = ? AND userid = ?').get(interaction.channel.id, interaction.user.id);
                if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && !inquirys) return await interaction.followUp({ content: 'このお問い合わせを閉じることができません' });
                await interaction.followUp({
                    content: 'このお問い合わせをクローズしました',
                });
                await interaction.channel.setParent('828268142820196372');
            }
            else {
                if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && interaction.user.id !== interaction.channel.ownerId) return await interaction.followUp('このスレッドをアーカイブすることができません');
                await interaction.followUp({
                    content: 'このスレッドをアーカイブしました',
                });
                await interaction.channel.setArchived(true, `Archived By ${interaction.user.tag}`);
                client.db.prepare('UPDATE  threads SET archived = ? WHERE threadid = ?;').run(1, interaction.channelId);
            }
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
            if (message.channel.parentId !== '821684794056245258' && !message.channel.isThread()) return await message.reply('そのコマンドはお問い合わせカテゴリー・スレッドでのみ使用できます');
            if (message.channel.parentId === '821684794056245258') {
                const inquirys = client.db.prepare('SELECT * FROM inquirys WHERE channelid = ? AND userid = ?').get(message.channel.id, message.user.id);
                if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && !inquirys) return await message.reply('このお問い合わせを閉じることができません');
                await message.reply('このお問い合わせをクローズしました');
                await message.channel.setParent('828268142820196372');
            }
            else {
                if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && message.channel.ownerId !== message.author.id) return await message.reply('このスレッドをアーカイブすることができません');
                await message.reply('このスレッドをアーカイブしました');
                await message.channel.setArchived(true, `Archived By ${message.author.tag}`);
                client.db.prepare('UPDATE  threads SET archived = ? WHERE threadid = ?;').run(1, message.channelId);
            }
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};