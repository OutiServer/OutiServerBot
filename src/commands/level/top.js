const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'top',
        description: 'レベルランキング',
        category: 'level',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('レベルランキング')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async function (client, interaction) {
        const top = client.database.getLevelTop();
        const embed = new EmbedBuilder()
            .setTitle('おうち鯖レベルランキングTOP10');
        for (const data of top) {
            const user = client.users.cache.get(data.user_id) || await client.users.fetch(data.user_id);
            embed.addFields({ name: user.tag, value: `${data.level}Level ${data.xp}XP` });
        }

        await interaction.followUp({ embeds: [embed] });
    },
};