const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'close',
        description: 'お問合せ・スレッドクローズ',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('お問合せ・スレッドクローズ'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
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
                const threads = client.db.prepare('SELECT * FROM threads WHERE channelid = ? AND userid = ?').get(interaction.channel.id, interaction.user.id);
                if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && !threads) return await interaction.followUp({ content: 'このスレッドをアーカイブすることができません' });
                await interaction.followUp({
                    content: 'このスレッドをアーカイブしました',
                });
                await client.channels.cache.get('870145872762126437').threads.cache.get(interaction.channelId).setArchived(true, `Archived By ${interaction.user.tag}`);
            }
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};