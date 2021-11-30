const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'avatar',
        description: 'ユーザーのアバター画像を表示',
        usage: '(アバターを表示するユーザー)',

        owneronly: false,
        adminonly: false,
        category: 'Main',
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
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const user = interaction.options.getUser('user', false);
            if (!user) {
                await interaction.followUp(
                    {
                        embeds: [
                            new MessageEmbed()
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
                            new MessageEmbed()
                                .setTitle(`${user.tag}のアバター`)
                                .setImage(user.avatarURL())
                                .setColor('RANDOM')
                                .setTimestamp(),
                        ],
                        allowedMentions: {
                            repliedUser: false,
                        },
                    },
                );
            }
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};