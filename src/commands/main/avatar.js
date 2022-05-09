const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'avatar',
        description: 'ユーザーのアバター画像を表示',
        usage: '(アバターを表示するユーザー)',
        aliases: [],
        category: 'main',
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
                    },
                );
            }
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },

    /**
     *
     * @param {import('../../Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    run_message: async function (client, message, args) {
        try {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) {
                await message.reply(
                    {
                        embeds: [
                            new MessageEmbed()
                                .setTitle(`${message.author.tag}のアバター`)
                                .setImage(message.author.avatarURL())
                                .setColor('RANDOM')
                                .setTimestamp(),
                        ],
                    },
                );
            }
            else {
                await message.reply(
                    {
                        embeds: [
                            new MessageEmbed()
                                .setTitle(`${user.tag}のアバター`)
                                .setImage(user.avatarURL())
                                .setColor('RANDOM')
                                .setTimestamp(),
                        ],
                    },
                );
            }
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};