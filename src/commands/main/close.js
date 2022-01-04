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
            if (interaction.channel.parentId !== '821684794056245258') return await interaction.followUp('このコマンドはお問い合わせカテゴリーのみ使用できます');
            await interaction.followUp('このお問い合わせをクローズしました');
            await interaction.channel.setParent('828268142820196372');
            client.db.prepare('DELETE FROM inquirys WHERE channelid = ?;').run(interaction.channelId);
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
            if (message.channel.parentId !== '821684794056245258') return await message.reply('このコマンドはお問い合わせカテゴリーで使用できます');
            await message.reply('このお問い合わせをクローズしました');
            await message.channel.setParent('828268142820196372');
            client.db.prepare('DELETE FROM inquirys WHERE channelid = ?;').run(message.channelId);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};