const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'word',
        description: '読み上げ辞書操作',
        usage: '',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('word')
        .setDescription('読み上げ辞書操作')
        .addSubcommand(subCommand => subCommand
            .setName('add')
            .setDescription('辞書に追加する')
            .addStringOption(option => option
                .setName('index')
                .setDescription('読み上げる単語')
                .setRequired(true))
            .addStringOption(option => option
                .setName('read')
                .setDescription('読み')
                .setRequired(true)),
        )
        .addSubcommand(subCommand => subCommand
            .setName('remove')
            .setDescription('辞書から削除する')
            .addStringOption(option => option
                .setName('index')
                .setDescription('削除する単語')
                .setRequired(true)),
        )
        .addSubcommand(subCommand => subCommand
            .setName('list')
            .setDescription('読み上げ登録されている単語集'),
        ),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            switch (interaction.options.getSubcommand(true)) {
                case 'add': {
                    const wordIndex = interaction.options.getString('index', true).toLocaleLowerCase();
                    const wordRead = interaction.options.getString('read', true).toLocaleLowerCase();
                    if (client.db.prepare('SELECT * FROM words WHERE index_word = ?;').get(wordIndex)) {
                        client.wordCache.find(word => word.index_word === wordIndex).read = wordRead;
                        client.db.prepare('UPDATE words SET read = ? WHERE index_word = ?;').run(wordRead, wordIndex);
                    }
                    else {
                        client.wordCache.push({
                            word_index: wordIndex,
                            read: wordRead,
                        });
                        client.db.prepare('INSERT INTO words VALUES (?, ?);').run(wordIndex, wordRead);
                    }

                    await interaction.followUp({
                        embeds: [
                            new MessageEmbed()
                                .setTitle('単語の登録を行いました')
                                .addField('単語', wordIndex, true)
                                .addField('読み方', wordRead, true)
                                .setColor('RANDOM'),
                        ],
                    });
                }
                    break;

                case 'remove': {
                    const wordIndex = interaction.options.getString('index', true);
                    if (!client.db.prepare('SELECT * FROM words WHERE index_word = ?;').get(wordIndex)) {
                        await interaction.followUp('その単語は登録されていません');
                    }
                    else {
                        client.db.prepare('DELETE FROM words WHERE index_word = ?;').run(wordIndex);
                        client.wordCache = client.wordCache.filter(word => word.index_word !== wordIndex);
                        await interaction.followUp(`${wordIndex}を単語から削除しました`);
                    }
                }
                    break;

                case 'list': {
                    const words = client.db.prepare('SELECT * FROM words;').all();
                    const embeds = [];
                    let page = 1;
                    for (let i = 0; i < words.length; i += 10) {
                        embeds.push(
                            new MessageEmbed()
                                .setTitle(`単語帳 ${page++}ページ目`)
                                .setDescription(`${words.slice(i, i + 10).map(word => `単語: ${word.index_word}\n読み: ${word.read}`).join('\n\n')}`)
                                .setColor('RANDOM'),
                        );
                    }

                    if (embeds.length < 2) {
                        return await interaction.followUp({
                            embeds: [embeds[0]],
                        });
                    }

                    const buttons = new MessageActionRow()
                        .addComponents(
                            [
                                new MessageButton()
                                    .setCustomId('left')
                                    .setLabel('◀️')
                                    .setStyle('PRIMARY')
                                    .setDisabled(),
                                new MessageButton()
                                    .setCustomId('right')
                                    .setLabel('▶️')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
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
                    const collector = message.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' });
                    collector.on('collect', async i => {
                        try {
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
                        }
                        catch (error) {
                            errorlog(client, interaction, error);
                        }
                    });
                }
                    break;

                default:
                    break;
            }
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
            switch (args[0]) {
                case 'add': {
                    if (!args[1] || !args[2]) return await message.reply('引数に単語と読み方を入れてください');

                    if (client.db.prepare('SELECT * FROM words WHERE index_word = ?;').get(args[1].toLocaleLowerCase())) {
                        client.db.prepare('UPDATE words SET read = ? WHERE index_word = ?;').run(args[2].toLocaleLowerCase(), args[1].toLocaleLowerCase());
                        client.wordCache = client.db.prepare('SELECT * FROM words;').all();
                    }
                    else {
                        client.db.prepare('INSERT INTO words VALUES (?, ?);').run(args[1].toLocaleLowerCase(), args[2].toLocaleLowerCase());
                        client.wordCache = client.db.prepare('SELECT * FROM words;').all();
                    }

                    await message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle('単語の登録を行いました')
                                .addField('単語', args[1], true)
                                .addField('読み方', args[2], true)
                                .setColor('RANDOM'),
                        ],
                    });
                }
                    break;

                case 'remove': {
                    if (!args[1]) return await message.reply('引数に削除する単語を入れてください');
                    if (!client.db.prepare('SELECT * FROM words WHERE index_word = ?;').get(args[1].toLocaleLowerCase())) {
                        await message.reply('その単語は登録されていません');
                    }
                    else {
                        client.db.prepare('DELETE FROM words WHERE index_word = ?;').run(args[1].toLocaleLowerCase());
                        client.wordCache = client.db.prepare('SELECT * FROM words;').all();
                        await message.reply(`${args[1]}を単語から削除しました`);
                    }
                }
                    break;

                case 'list': {
                    const words = client.db.prepare('SELECT * FROM words;').all();
                    const embeds = [];
                    let page = 1;
                    for (let i = 0; i < words.length; i += 10) {
                        embeds.push(
                            new MessageEmbed()
                                .setTitle(`単語帳 ${page++}ページ目`)
                                .setDescription(`${words.slice(i, i + 10).map(word => `単語: ${word.index_word}\n読み: ${word.read}`).join('\n\n')}`)
                                .setColor('RANDOM'),
                        );
                    }

                    if (embeds.length < 2) {
                        return await message.reply({
                            embeds: [embeds[0]],
                        });
                    }

                    const buttons = new MessageActionRow()
                        .addComponents(
                            [
                                new MessageButton()
                                    .setCustomId('left')
                                    .setLabel('◀️')
                                    .setStyle('PRIMARY')
                                    .setDisabled(),
                                new MessageButton()
                                    .setCustomId('right')
                                    .setLabel('▶️')
                                    .setStyle('PRIMARY'),
                                new MessageButton()
                                    .setCustomId('stop')
                                    .setLabel('⏹️')
                                    .setStyle('DANGER'),
                            ],
                        );

                    const msg = await message.reply({
                        embeds: [embeds[0]],
                        components: [buttons],
                        fetchReply: true,
                    });

                    let select = 0;

                    const filter = (i) => i.user.id === message.author.id;
                    const collector = msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' });
                    collector.on('collect', async i => {
                        try {
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
                        }
                        catch (error) {
                            commanderror_message(client, message, error);
                        }
                    });
                }
                    break;

                default:
                    break;
            }
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};