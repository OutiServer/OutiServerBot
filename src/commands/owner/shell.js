const { MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');
const emojis = require('../../../dat/json/emojis.json');
const { execSync } = require('child_process');

module.exports = {
    info: {
        name: 'shell',
        description: 'Shellコマンドを実行する\n開発者がいちいちssh接続をするのがめんどくさいからこのコマンドは作られた',
        usage: '[Shellコマンド]',
        aliases: [],
        category: 'owner',
    },

    data: new SlashCommandBuilder()
        .setName('shell')
        .setDescription('Shellコマンドを実行する\n開発者がいちいちssh接続をするのがめんどくさいからこのコマンドは作られた')
        .addStringOption(option => {
            option.setName('shellcmd');
            option.setDescription('Shellコマンド');
            option.setRequired(true);

            return option;
        }),

    /**
       * @param {import('../../Bot')} client
       * @param {import('discord.js').CommandInteraction} interaction
       */

    run: async function (client, interaction) {
        try {
            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ok')
                        .setEmoji(emojis.owov)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('no')
                        .setEmoji(emojis.owox)
                        .setStyle('PRIMARY'),
                );

            const msg = await interaction.followUp({
                content: `${codeBlock('以下のShellコマンドを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます')}${codeBlock('sh', interaction.options.getString('code'))}`,
                components: [buttons],
            });

            const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === interaction.user.id;
            const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
            if (!response2) {
                return await interaction.deleteReply();
            }
            else if (response2.customId === 'no') {
                await interaction.deleteReply();
            }
            else if (response2.customId === 'ok') {
                const stdout = execSync(interaction.options.getString('shellcmd'));
                if (stdout.toString().length <= 2000) {
                    await interaction.editReply({
                        content: codeBlock(stdout.toString()),
                        components: [],
                    });
                }
                else {
                    await interaction.editReply({
                        content: '実行結果が2000文字を超えているためファイルに出力しました',
                        components: [],
                        files: [
                            new MessageAttachment(stdout, 'stdout.txt'),
                        ],
                    });
                }
            }
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
    run_message: async function (client, message, args) {
        try {
            if (!args[0]) return await message.reply('引数に評価するコードを入れてください');

            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ok')
                        .setEmoji(emojis.owov)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('no')
                        .setEmoji(emojis.owox)
                        .setStyle('PRIMARY'),
                );

            const msg = await message.reply({
                content: `${codeBlock('以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます')}${codeBlock('sh', args.join(' '))}`,
                components: [buttons],
            });

            const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === message.author.id;
            const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
            if (response2.customId === 'no') {
                await msg.delete();
            }
            else if (response2.customId === 'ok') {
                const stdout = execSync(args.join(' '));
                if (stdout.toString().length <= 2000) {
                    await msg.edit({
                        content: codeBlock(stdout.toString()),
                        components: [],
                    });
                }
                else {
                    await msg.edit({
                        content: '実行結果が2000文字を超えているためファイルに出力しました',
                        components: [],
                        files: [
                            new MessageAttachment(stdout, 'stdout.txt'),
                        ],
                    });
                }
            }
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};