const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'word',
        description: '読み上げ辞書操作',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('word')
        .setDescription('読み上げ辞書操作')
        .addSubcommand(subCommand => subCommand
            .setName('add')
            .setDescription('辞書に追加する')
            .addStringOption(option => option
                .setName('surface')
                .setDescription('読み上げる単語')
                .setRequired(true))
            .addStringOption(option => option
                .setName('pronunciation')
                .setDescription('カタカナでの読み方')
                .setRequired(true))
            .addIntegerOption(option => option
                .setName('accent_type')
                .setDescription('アクセント値(音が下がる場所を指す)')
                .setRequired(true)),
        )
        .addSubcommand(subCommand => subCommand
            .setName('remove')
            .setDescription('辞書から削除する')
            .addStringOption(option => option
                .setName('uuid')
                .setDescription('削除する単語のUUID')
                .setRequired(true)),
        )
        .addSubcommand(subCommand => subCommand
            .setName('list')
            .setDescription('読み上げ登録されている単語集'),
        ),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        switch (interaction.options.getSubcommand(true)) {
            case 'add':
                {
                    const pronunciation = interaction.options.getString('pronunciation', true);
                    // eslint-disable-next-line no-irregular-whitespace
                    if (pronunciation.match(/^[ァ-ヶー　]*$/) === null) {
                        await interaction.followUp('オプション、pronunciationは全角カタカナである必要があります');
                    }
                    else {
                        const statusCode = await SpeakerClient.addWord(interaction.options.getString('surface', true), pronunciation, interaction.options.getInteger('accent_type', true));
                        if (statusCode === 200) {
                            await interaction.followUp({
                                embeds: [
                                    new EmbedBuilder()
                                        .setTitle('単語を登録しました')
                                        .addFields([
                                            { name: '読み上げ単語', value: interaction.options.getString('surface', true) },
                                            { name: '読み上げ方', value: interaction.options.getString('pronunciation', true) },
                                            { name: 'アクセント値(音が下がる場所を指す)', value: interaction.options.getInteger('accent_type', true).toString() },
                                        ]),

                                ],
                            });
                        }
                        else {
                            await interaction.followUp(`単語の登録に失敗しました、HTTPStatusCode: ${statusCode}`);
                        }
                    }
                }
                break;
            case 'remove':
                {
                    const uuid = interaction.options.getString('uuid', true);
                    if ((await SpeakerClient.wordList()).filter(word => word.key === uuid).length < 1) return await interaction.followUp('そのUUIDは登録されていません');

                    const statusCode = await SpeakerClient.removeWord(uuid);
                    if (statusCode === 204) {
                        await interaction.followUp('単語を削除しました');
                    }
                    else {
                        await interaction.followUp(`単語の削除に失敗しました、HTTPStatusCode: ${statusCode}`);
                    }
                }
                break;
            case 'list':
                {
                    const words = await SpeakerClient.wordList();
                    if (words.length < 1) return interaction.followUp('現在登録されている単語はありません');

                    const embeds = [];
                    let page = 1;
                    for (let i = 0; i < words.length; i += 10) {
                        embeds.push(
                            new EmbedBuilder()
                                .setTitle(`単語帳 ${page++}ページ目`)
                                .setDescription(`${words.slice(i, i + 10).map(word => `UUID: ${word.key}\n単語: ${word.value.surface}\n読み: ${word.value.pronunciation}\nアクセント値(音が下がる場所を指す): ${word.value.accent_type}`).join('\n\n')}`),

                        );
                    }

                    if (embeds.length < 2) {
                        return await interaction.followUp({
                            embeds: [embeds[0]],
                        });
                    }

                    const buttons = new ActionRowBuilder()
                        .addComponents(
                            [
                                new ButtonBuilder()
                                    .setCustomId('left')
                                    .setLabel('◀️')
                                    .setStyle(ButtonStyle.Primary)
                                    .setDisabled(),
                                new ButtonBuilder()
                                    .setCustomId('right')
                                    .setLabel('▶️')
                                    .setStyle(ButtonStyle.Primary),
                                new ButtonBuilder()
                                    .setCustomId('stop')
                                    .setLabel('⏹️')
                                    .setStyle('DANGER'),
                            ],
                        );

                    const message = await interaction.followUp({
                        embeds: [embeds[0]],
                        components: [buttons],
                        fetchReply: true,
                    });

                    let select = 0;
                    const filter = (i) => i.user.id === interaction.user.id;
                    const collector = message.createMessageComponentCollector({ filter: filter, componentType: ComponentType.Button });
                    collector.on('collect', async i => {
                        if (i.customId === 'left') {
                            select--;
                            buttons.components[1].setDisabled(false);
                            if (select < 1) {
                                buttons.components[0].setDisabled();
                            }
                            await i.update(
                                {
                                    embeds: [embeds[select]],
                                    components: [buttons],
                                },
                            );
                        }
                        else if (i.customId === 'right') {
                            select++;
                            buttons.components[0].setDisabled(false);
                            if (select >= embeds.length - 1) {
                                buttons.components[1].setDisabled();
                            }
                            await i.update(
                                {
                                    embeds: [embeds[select]],
                                    components: [buttons],
                                },
                            );
                        }
                        else if (i.customId === 'stop') {
                            buttons.components[0].setDisabled();
                            buttons.components[1].setDisabled();
                            buttons.components[2].setDisabled();
                            await i.update(
                                {
                                    embeds: [embeds[select]],
                                    components: [buttons],
                                },
                            );
                            collector.stop();
                        }
                    });
                }
                break;
            default:
                break;
        }
    },
};