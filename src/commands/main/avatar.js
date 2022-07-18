const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'avatar',
        description: 'ユーザーのアバター画像を表示',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('ユーザーのアバター画像を表示')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription('アバターを表示するユーザー')
                .setRequired(false);
        }),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const user = interaction.options.getUser('user', false);
        if (!user) {
            await interaction.followUp(
                {
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.user.tag}のアバター`)
                            .setImage(interaction.user.avatarURL())
                            .setColor('RANDOM')
                            .setTimestamp(),
                    ],
                },
            );
        }
        else {
            await interaction.followUp(
                {
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${user.tag}のアバター`)
                            .setImage(user.avatarURL())
                            .setColor('RANDOM')
                            .setTimestamp(),
                    ],
                },
            );
        }
    },
};