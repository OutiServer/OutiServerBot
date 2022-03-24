const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { errorlog, commanderror_message } = require('../../functions/error');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'join',
        description: '読み上げを開始',
        usage: '',
        aliases: [],
        category: 'main',
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
                return await interaction.followUp('VCに接続してからこのコマンドを送信してください！');
            }
            else if (client.connection) {
                return await interaction.followUp('既に読み上げを開始しています');
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

            await interaction.followUp(`${interaction.member.voice.channel.name}で読み上げを開始しました！`);
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
            else if (client.speakers.get(message.guildId)) {
                return await message.reply('既に読み上げを開始しています');
            }

            client.speakers.set(message.guildId, new SpeakerClient(client,
                message.guildId,
                message.channelId,
                message.member.voice.channelId,
                message.guild.voiceAdapterCreator,
            ));

            await message.reply(`${message.member.voice.channel.name}で読み上げを開始しました！`);
            /*
            await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription('注意事項\n・おうち鯖Botのプログラムが生成した音声を何らかの形で録音し、再配布することを禁止します。\n・変な長文等を読み上げさせないようにお願いします(サーバーに負荷がかかってしまうため) \n・デフォルトで100文字以上は読み上げさせないようにしています\n\nーーーCREDITーーー\nVOICEVOX ENGINE様公式WEB https://voicevox.hiroshiba.jp/'),
                ],
            });
            */
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};