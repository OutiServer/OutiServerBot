const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: 'outiserverstatus',
        description: 'おうち鯖のMinecraftサーバー状態を表示',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('outiserverstatus')
        .setDescription('おうち鯖のMinecraftサーバー状態を表示')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const msg = await interaction.followUp('サーバー状態を取得中です、お待ちください...');

        try {
            const status = await util.status('outiserver.com', 25565, { timeout: 5000, enableSRV: true });

            msg.edit({
                content: 'ステータス取得に成功しました',
                embeds: [
                    new EmbedBuilder()
                        .setTitle('おうちサーバーの状態')
                        .addFields([
                            { name: 'プレイヤー数', value: `${status.players.online}/${status.players.max}\n\n参加中のプレイヤーリスト\n${status.players.sample.map(p => `${p.name}(${p.id})`).join('\n')}` },
                            { name: 'IP', value: 'outiserver.com' },
                            { name: 'Port', value: 'Java Edition: 25565\nBedrock Edition: 50001' },
                            { name: 'Version', value: status.version.name },
                        ])
                        .setImage('https://media.discordapp.net/attachments/906452841890205756/954540860224184341/outisabakoiyo.jpeg'),
                ],
            });
        }
        catch (e) {
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