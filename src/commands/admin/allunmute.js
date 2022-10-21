const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    info: {
        name: 'allunmute',
        description: '全員のミュートを解除する',
        category: 'admin',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('allunmute')
        .setDescription('全員のミュートを解除する')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.member.voice.channel) return await interaction.followUp('このコマンドを使用するにはVCに参加している必要があります');

        interaction.member.voice.channel.members.filter(m => !m.user.bot).map(async m => {
            try {
                await m.voice?.setMute(false, `UnMutedBy: ${interaction.user.tag}`);
            }
            // eslint-disable-next-line no-empty
            catch (error) {
            }
        });

        await interaction.followUp('VCにいるメンバー全員をミュート解除しました');
    },
};