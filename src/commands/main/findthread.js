const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'findthread',
        description: 'スレッドを検索する',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('findthread')
        .setDescription('スレッドを検索する')
        .addStringOption(option => option
            .setName('threadname')
            .setDescription('検索するスレッド名')
            .setRequired(true),
        )
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const name = interaction.options.getString('threadname', true);
        const threads = interaction.guild.channels.cache.filter(channel => !!channel.threads)
            .filter(channel => channel.threads.cache.size > 0);

        const activeThreads = [];
        threads.forEach(channel => {
            channel.threads.cache.forEach(thread => {
                if (thread.name.match(name)) activeThreads.push(`<#${thread.id}>`);
            });
        });

        await interaction.followUp(activeThreads.length < 1 ? `名前 ${name} にマッチするスレッドは見つかりませんでした` : `名前 ${name} にマッチするスレッドは${activeThreads.length}個見つかりました\n${activeThreads.join('\n')}`);
    },
};