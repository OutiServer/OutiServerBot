const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'allmute',
        description: '全員をミュートする',
        usage: '',
        aliases: [],
        category: 'admin',
    },

    data: new SlashCommandBuilder()
        .setName('allmute')
        .setDescription('全員をミュートする'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.member.voice.channel) return await interaction.followUp('このコマンドを使用するにはVCに参加している必要があります');
            interaction.member.voice.channel.members.filter(m => !m.user.bot).map(async m => {
                try {
                    await m.voice?.setMute(true, `MutedBy: ${interaction.user.tag}`);
                }
                // eslint-disable-next-line no-empty
                catch (error) {
                }
            });

            await interaction.followUp('VCにいるメンバー全員をミュートしました');
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
            if (!message.member.voice.channel) return await message.reply('このコマンドを使用するにはVCに参加している必要があります');
            message.member.voice.channel.members.filter(m => !m.user.bot).map(async m => {
                try {
                    await m.voice?.setMute(true, `MutedBy: ${message.author.tag}`);
                }
                // eslint-disable-next-line no-empty
                catch (error) {
                }
            });

            await message.reply('VCにいるメンバー全員をミュートしました');
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};