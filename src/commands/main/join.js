const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'join',
        description: '読み上げを開始',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('読み上げを開始する'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            // message.member.voice.channelId
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
};