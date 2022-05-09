const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'outiserverstatus',
        description: 'おうちサーバーの状態を表示するコマンド',
        category: 'minecraft',
    },

    data: new SlashCommandBuilder()
        .setName('outiserverstatus')
        .setDescription('おうちサーバーの状態を表示する'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp('このコマンドは現在使用できません');

        /*
        statusBedrock('outiserver.com', 19132, { timeout: 5000 })
            .then(async (result) => {
                await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('🏠おうちサーバーの現在の状態🏠')
                            .addField('IPアドレス', 'outiserver.com', true)
                            .addField('ポート', result.srvRecord?.port.toString() ?? '19132', true)
                            .addField('サーバーのバージョン', result.version.name, true)
                            .addField('サーバーのプロトコルバージョン', result.version.protocol.toString(), true)
                            .addField('デフォルトゲームモード', result.gameMode, true)
                            .addField('現在参加中のメンバー', `${result.players.online}/${result.players.max}人`, true)
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')
                            .setColor('RANDOM'),
                    ],
                });
            })
            .catch(async (e) => {
                console.log(e);
                await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('🏠おうちサーバーの現在の状態🏠')
                            .setDescription('おうちサーバーは現在落ちてます')
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
                            .setColor('RANDOM'),
                    ],
                });
            });
            */
    },
};