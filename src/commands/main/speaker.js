const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'speaker',
        description: '読み上げるキャラクターを設定する',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('speaker')
        .setDescription('読み上げるキャラクターを設定する')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const speakers = await SpeakerClient.getSpeakers();
        const speakerSelect = [];
        speakers.forEach(speaker => {
            speaker.styles.forEach(speakerStyle => {
                speakerSelect.push({
                    label: `${speaker.name} ${speakerStyle.name}`,
                    value: speakerStyle.id.toString(),
                });
            });
        });

        const msg = await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle('読み上げキャラクターの設定')
                    .setDescription('[VOICEVOX様公式サイト、各キャラクターの立ち絵・詳細はこちら](https://voicevox.hiroshiba.jp/)\n\nCREDIT\n\nVOICEVOX:ずんだもん\nVOICEVOX:四国めたん\nVOICEVOX:春日部つむぎ\nVOICEVOX:雨晴はう\nVOICEVOX:波音リツ\nVOICEVOX:玄野武宏\nVOICEVOX:白上虎太郎\nVOICEVOX:青山龍星\nVOICEVOX:冥鳴ひまり\nVOICEVOX:九州そら\nVOICEVOX:もち子(cv 明日葉よもぎ)\nVOICEVOX:剣崎雌雄\nVOICEVOX:WhiteCUL\nVOICEVOX:後鬼\nVOICEVOX:No.7')
                    .addFields([
                        { name: '四国めたん', value: 'はっきりした芯のある声', inline: true },
                        { name: 'ずんだもん', value: '子供っぽい高めの声', inline: true },
                        { name: '春日部つむぎ', value: 'はっきりした芯のある声', inline: true },
                        { name: '雨晴はう', value: '優しく可愛い声', inline: true },
                        { name: '波音リツ', value: '低めのクールな声', inline: true },
                        { name: '玄野武宏', value: '爽やかな青年ボイス', inline: true },
                        { name: '白上虎太郎', value: '声変わり直後の少年ボイス', inline: true },
                        { name: '青山龍星', value: '重厚な低音ボイス', inline: true },
                        { name: '冥鳴ひまり', value: '気品のある大人な声', inline: true },
                        { name: '九州そら', value: '爽やかな青年ボイス', inline: true },
                        { name: 'もち子さん', value: '明瞭で穏やかな声', inline: true },
                        { name: 'WhiteCUL', value: '聞き心地のよい率直な声', inline: true },
                        { name: '後鬼', value: '包容力のある奥ゆかしい声', inline: true },
                        { name: 'No.7', value: 'しっかりした凛々しい声', inline: true },
                    ]),

            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('speaker_1')
                            .setPlaceholder('読み上げキャラ選択')
                            .addOptions(speakerSelect.slice(0, 25)),
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('speaker_2')
                            .setPlaceholder('読み上げキャラ選択')
                            .addOptions(speakerSelect.slice(25)),
                    ),
            ],
        });

        const filter = (i) => (i.customId === 'speaker_1' || i.customId === 'speaker_2') && i.user.id === interaction.user.id;
        /** @type {import('discord.js').SelectMenuInteraction} */
        const response = await msg.awaitMessageComponent({ filter, componentType: ComponentType.SelectMenu, max: 1, time: 60000 });
        // eslint-disable-next-line no-shadow
        const speaker = speakers.find(speaker => speaker.styles.find(speakerStyle => speakerStyle.id === Number(response.values[0])));
        // eslint-disable-next-line no-shadow
        const speakerStyle = speaker.styles.find(speakerStyle => speakerStyle.id === Number(response.values[0]));
        await client.database.setSpeaker(interaction.user.id, speakerStyle.id);
        response.update({
            content: `読み上げキャラクターを${speaker.name} ${speakerStyle.name}にセット`,
            embeds: [],
            components: [],
        });
    },
};