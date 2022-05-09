const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'speaker',
        description: '読み上げるキャラクターを設定する',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('speaker')
        .setDescription('読み上げるキャラクターを設定する'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        // eslint-disable-next-line no-empty
        try {
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
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            const speakers = await SpeakerClient.getSpeakers();
            const msg = await message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle('読み上げキャラクターの設定')
                        .setDescription('[各キャラクターの立ち絵・詳細はこちら](https://voicevox.hiroshiba.jp/)\n\nCREDIT\n\nVOICEVOX:ずんだもん\nVOICEVOX:四国めたん\nVOICEVOX:春日部つむぎ\nVOICEVOX:雨晴はう\nVOICEVOX:波音リツ\nVOICEVOX:玄野武宏\nVOICEVOX:白上虎太郎\nVOICEVOX:青山龍星\nVOICEVOX:冥鳴ひまり\nVOICEVOX:九州そら')
                        .addField('四国めたん', 'はっきりした芯のある声', true)
                        .addField('ずんだもん', '子供っぽい高めの声', true)
                        .addField('春日部つむぎ', '元気な明るい声', true)
                        .addField('雨晴はう', '優しく可愛い声', true)
                        .addField('波音リツ', '低めのクールな声', true)
                        .addField('玄野武宏', '爽やかな青年ボイス', true)
                        .addField('白上虎太郎', '声変わり直後の少年ボイス', true)
                        .addField('青山龍星', '重厚な低音ボイス', true)
                        .addField('冥鳴ひまり', '柔らかく温かい声', true)
                        .addField('九州そら', '気品のある大人な声', true)
                        .setColor('RANDOM'),
                ],
                components: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                                .setCustomId('speaker')
                                .addOptions(speakers.map(speaker => ({ label: speaker.name, value: speaker.speaker_uuid }))),
                        ),
                ],
            });

            const filter = (i) => (i.customId === 'speaker') && i.user.id === message.author.id;
            /** @type {import('discord.js').SelectMenuInteraction} */
            const response = await msg.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', max: 1, time: 60000 });
            // eslint-disable-next-line no-shadow
            const speaker = speakers.find(speaker => speaker.speaker_uuid === response.values[0]);
            client.db.prepare('UPDATE speakers SET speaker_id = ? WHERE userid = ?;').run(speaker.styles[0].id, message.author.id);
            response.update({
                content: `読み上げキャラクターを${speaker.name}にセット`,
                embeds: [],
                components: [],
            });
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};