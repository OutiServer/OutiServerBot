const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');
const { inspect } = require('better-sqlite3/lib/util');

module.exports = {
    info: {
        name: 'db',
        description: 'データベースに直接接続',
        usage: '[実行するクエリ文]',
        aliases: [],
        category: 'owner',
    },

    data: new SlashCommandBuilder()
        .setName('db')
        .setDescription('データベースに直接接続')
        .addStringOption(option => {
            option.setName('query');
            option.setDescription('クエリ文');
            option.setRequired(true);

            return option;
        }),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async function (client, interaction) {
        try {
            const query = interaction.options.getString('query', true).split(/\s+/)[0].toLowerCase();
            if (query === 'select') {
                try {
                    await interaction.followUp(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription(codeBlock(inspect(client.db.prepare(interaction.options.getString('query', true)).get())))
                                    .setColor('RANDOM')
                                    .setTimestamp(),
                            ],
                        },
                    );
                }
                catch (error) {
                    await interaction.followUp(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription(codeBlock(error.stack))
                                    .setColor('RANDOM')
                                    .setTimestamp(),
                            ],
                        },
                    );
                }
            }
            else if (['insert', 'update', 'delete'].includes(query)) {
                const buttons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('ok')
                            .setEmoji('810436146718441483')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId('no')
                            .setEmoji('810436146978619392')
                            .setStyle('PRIMARY'),
                    );

                const msg = await interaction.followUp(
                    {
                        content: 'この変更でいい場合はokを、取り消す場合はnoを送信してください',
                        embeds: [
                            new MessageEmbed()
                                .setDescription(codeBlock('sql', interaction.options.getString('query', true)))
                                .setColor('RANDOM')
                                .setTimestamp(),
                        ],
                        components: [
                            buttons,
                        ],
                    },
                );

                const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === interaction.user.id;
                const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
                if (!response2) { return await interaction.deleteReply(); }
                else if (response2.customId === 'no') {
                    await interaction.deleteReply();
                }
                else if (response2.customId === 'ok') {
                    try {
                        await interaction.editReply(
                            {
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle('実行結果')
                                        .setDescription(codeBlock(inspect(client.db.prepare(interaction.options.getString('query', true)).run())))
                                        .setColor('RANDOM')
                                        .setTimestamp(),
                                ],
                                components: [],
                            },
                        );
                    }
                    catch (error) {
                        await interaction.editReply(
                            {
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle('実行結果')
                                        .setDescription(codeBlock(error.stack))
                                        .setColor('RANDOM')
                                        .setTimestamp(),
                                ],
                                components: [],
                            },
                        );
                    }
                }


            }
            else {
                await interaction.followUp('その基本命令文は対応していません。\n`SELECT・INSERT・UPDATE・DELETE・CLOSE` のみ対応しています');
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
    run_message: async function (client, message, args) {
        try {
            if (!args[0]) return await message.reply('引数にクエリ文を入れてください');

            const query = args[0].split(/\s+/)[0].toLowerCase();
            if (query === 'select') {
                try {
                    await message.reply(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription(codeBlock(inspect(client.db.prepare(args.join(' ')).get())))
                                    .setColor('RANDOM')
                                    .setTimestamp(),
                            ],
                        },
                    );
                }
                catch (error) {
                    await message.reply(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription(codeBlock(error.stack))
                                    .setColor('RANDOM')
                                    .setTimestamp(),
                            ],
                        },
                    );
                }
            }
            else if (['insert', 'update', 'delete'].includes(query)) {
                const buttons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('ok')
                            .setEmoji('810436146718441483')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId('no')
                            .setEmoji('810436146978619392')
                            .setStyle('PRIMARY'),
                    );

                const msg = await message.reply(
                    {
                        content: 'この変更でいい場合はokを、取り消す場合はnoを送信してください',
                        embeds: [
                            new MessageEmbed()
                                .setDescription(codeBlock('sql', args.join(' ')))
                                .setColor('RANDOM')
                                .setTimestamp(),
                        ],
                        components: [
                            buttons,
                        ],
                    },
                );

                const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === message.user.id;
                const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
                if (!response2) {
                    return await msg.delete();
                }
                else if (response2.customId === 'no') {
                    await msg.delete();
                }
                else if (response2.customId === 'ok') {
                    try {
                        await msg.edit(
                            {
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle('実行結果')
                                        .setDescription(codeBlock(inspect(client.db.prepare(args.join(' ')).run())))
                                        .setColor('RANDOM')
                                        .setTimestamp(),
                                ],
                                components: [],
                            },
                        );
                    }
                    catch (error) {
                        await msg.edit(
                            {
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle('実行結果')
                                        .setDescription(codeBlock(error.stack))
                                        .setColor('RANDOM')
                                        .setTimestamp(),
                                ],
                                components: [],
                            },
                        );
                    }
                }


            }
            else {
                await message.reply('その基本命令文は対応していません。\n`SELECT・INSERT・UPDATE・DELETE` のみ対応しています');
            }
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};