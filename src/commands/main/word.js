const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'word',
        description: '読み上げ辞書操作',
        usage: '',
        aliases: [],
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('word')
        .setDescription('読み上げ辞書操作')
        .addSubcommand((subCommand) =>
            subCommand
                .setName('add')
                .setDescription('辞書に追加する')
                .addStringOption((option) =>
                    option
                        .setName('index')
                        .setDescription('読み上げる単語')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option.setName('read').setDescription('読み').setRequired(true),
                ),
        )
        .addSubcommand((subCommand) =>
            subCommand
                .setName('remove')
                .setDescription('辞書から削除する')
                .addStringOption((option) =>
                    option
                        .setName('index')
                        .setDescription('削除する単語')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subCommand) =>
            subCommand.setName('list').setDescription('読み上げ登録されている単語集'),
        ),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        switch (interaction.options.getSubcommand(true)) {
            case 'add':
                {
                    const wordIndex = interaction.options
                        .getString('index', true)
                        .toLocaleLowerCase();
                    const wordRead = interaction.options
                        .getString('read', true)
                        .toLocaleLowerCase();
                    if (client.database.getWord(wordIndex)) {
                        client.wordCache.find(
                            (word) => word.word === wordIndex,
                        ).replace_word = wordRead;
                        client.database.updateWord(wordIndex, wordRead);
                    }
                    else {
                        client.wordCache.push({
                            word_index: wordIndex,
                            read: wordRead,
                        });
                        client.database.addWord(wordIndex, wordRead);
                    }

                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('単語の登録を行いました')
                                .addField('単語', wordIndex, true)
                                .addField('読み方', wordRead, true)
                                .setColor('Random'),
                        ],
                    });
                }
                break;

            case 'remove':
                {
                    const wordIndex = interaction.options.getString('index', true);
                    if (!client.database.getWord(wordIndex)) {
                        await interaction.followUp('その単語は登録されていません');
                    }
                    else {
                        client.database.deleteWord(wordIndex);
                        client.wordCache = client.wordCache.filter((word) => word.word !== wordIndex);
                        await interaction.followUp(`${wordIndex}を単語から削除しました`);
                    }
                }
                break;

            case 'list':
                {
                    const words = client.database.getAllWord();
                    const embeds = [];
                    let page = 1;
                    for (let i = 0; i < words.length; i += 10) {
                        embeds.push(
                            new EmbedBuilder()
                                .setTitle(`単語帳 ${page++}ページ目`)
                                .setDescription(
                                    `${words
                                        .slice(i, i + 10)
                                        .map(
                                            (word) => `単語: ${word.index_word}\n読み: ${word.read}`,
                                        )
                                        .join('\n\n')}`,
                                )
                                .setColor('Random'),
                        );
                    }

                    if (embeds.length < 2) {
                        return await interaction.followUp({
                            embeds: [embeds[0]],
                        });
                    }

                    const buttons = new ActionRowBuilder()
                        .addComponents([
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
                                .setStyle(ButtonStyle.Danger),
                        ]);

                    const message = await interaction.followUp({
                        embeds: [embeds[0]],
                        components: [buttons],
                        fetchReply: true,
                    });

                    let select = 0;

                    const filter = (i) => i.user.id === interaction.user.id;
                    const collector = message.createMessageComponentCollector({
                        filter: filter,
                        componentType: ComponentType.Button,
                    });
                    collector.on('collect', async (i) => {
                        if (i.customId === 'left') {
                            select--;
                            buttons.components[1].setDisabled(false);
                            if (select < 1) {
                                buttons.components[0].setDisabled();
                            }
                            await i.update({
                                embeds: [embeds[select]],
                                components: [buttons],
                            });
                        }
                        else if (i.customId === 'right') {
                            select++;
                            buttons.components[0].setDisabled(false);
                            if (select >= embeds.length - 1) {
                                buttons.components[1].setDisabled();
                            }
                            await i.update({
                                embeds: [embeds[select]],
                                components: [buttons],
                            });
                        }
                        else if (i.customId === 'stop') {
                            buttons.components[0].setDisabled();
                            buttons.components[1].setDisabled();
                            buttons.components[2].setDisabled();
                            await i.update({
                                embeds: [embeds[select]],
                                components: [buttons],
                            });
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
