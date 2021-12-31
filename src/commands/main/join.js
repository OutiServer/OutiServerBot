const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'join',
        description: '読み上げを開始',
        usage: '',
        aliases: [],
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('読み上げを開始する'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.member.voice.channelId) {
                return await interaction.followUp(
                    {
                        content: 'VCに接続してからこのコマンドを送信してください！',
                    },
                );
            }
            else if (client.connection) {
                return await interaction.followUp(
                    {
                        content: '既に読み上げを開始しています',
                    },
                );
            }

            client.connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            client.speekqueue = {
                channel: [interaction.channelId],
                message: [],
                flag: false,
            };

            await interaction.followUp({
                content: `${interaction.member.voice.channel.name}で読み上げを開始しました！`,
            });
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
            if (!message.member.voice.channelId) {
                return await message.reply('VCに接続してからこのコマンドを送信してください！');
            }
            else if (client.connection) {
                return await message.reply('既に読み上げを開始しています');
            }

            client.connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            client.speekqueue = {
                channel: [message.channelId],
                message: [],
                flag: false,
            };

            await message.reply(`${message.member.voice.channel.name}で読み上げを開始しました！`);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};