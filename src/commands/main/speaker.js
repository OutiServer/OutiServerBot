const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'speaker',
        description: '読み上げるキャラクターを設定する',
        category: 'main',
        deferReply: false,
    },

    data: new SlashCommandBuilder()
        .setName('speaker')
        .setDescription('読み上げるキャラクターを設定する'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const speakers = await SpeakerClient.getSpeakers();
        const msg = await interaction.followUp({
            embeds: [
                new MessageEmbed()
                    .setTitle('読み上げキャラクターの設定')
                    .setDescription('[VOICEVOX様公式サイト、各キャラクターの立ち絵・詳細はこちら](https://voicevox.hiroshiba.jp/)\n\nCREDIT\n\nVOICEVOX:ずんだもん\nVOICEVOX:四国めたん\nVOICEVOX:春日部つむぎ\nVOICEVOX:雨晴はう\nVOICEVOX:波音リツ\nVOICEVOX:玄野武宏\nVOICEVOX:白上虎太郎\nVOICEVOX:青山龍星\nVOICEVOX:冥鳴ひまり\nVOICEVOX:九州そら\nVOICEVOX:もち子(cv 明日葉よもぎ)')
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
                    .addField('もち子さん', '明瞭で穏やかな声', true)
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

        const filter = (i) => (i.customId === 'speaker') && i.user.id === interaction.user.id;
        /** @type {import('discord.js').SelectMenuInteraction} */
        const response = await msg.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', max: 1, time: 60000 });
        // eslint-disable-next-line no-shadow
        const speaker = speakers.find(speaker => speaker.speaker_uuid === response.values[0]);
        client.database.setSpeaker(interaction.user.id, speaker.styles[0].id);
        response.update({
            content: `読み上げキャラクターを${speaker.name}にセット`,
            embeds: [],
            components: [],
        });
    },
};