const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: 'outiserverstatus',
        description: 'おうち鯖のMinecraftサーバー状態を表示',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('outiserverstatus')
        .setDescription('おうち鯖のMinecraftサーバー状態を表示'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (interaction.guildId !== '877587515677237258' && interaction.guildId !== '872880984205430834') return await interaction.followUp('このコマンドはこのサーバーでは使用できません');

        const msg = await interaction.followUp('サーバー状態を取得中です、お待ちください...');

        try {
            const status = await util.statusBedrock('126.75.152.179', 19132, { timeout: 5000 });

            msg.edit({
                content: 'ステータス取得に成功しました',
                embeds: [
                    new EmbedBuilder()
                        .setTitle('おうちサーバーの状態')
                        .addFields([
                            { name: 'プレイヤー数', value: `${status.players.online}/${status.players.max}` },
                            { name: 'IP', value: '126.75.152.179' },
                            { name: 'Port', value: status.portIPv4 ? status.portIPv4.toString() : '不明' },
                            { name: 'Version', value: status.version.name },
                        ])
                        .setImage('https://media.discordapp.net/attachments/906452841890205756/954540860224184341/outisabakoiyo.jpeg'),
                ],
            });
        }
        catch (e) {
            console.error(e);
            msg.edit({
                content: 'ステータス取得に失敗しました',
                embeds: [
                    new EmbedBuilder()
                        .setTitle('おうちサーバーの状態')
                        .setDescription('おうちサーバーは現在落ちています')
                        .setImage('https://media.discordapp.net/attachments/906452841890205756/954540727898099732/setumeisitekudasai.jpeg'),
                ],
            });
        }
    },
};