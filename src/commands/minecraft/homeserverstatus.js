const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const util = require('minecraft-server-util');
const bot = require('../../utils/Bot');
const { errorlog, clienterrorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'homeserverstatus',
        description: 'おうちサーバーの状態を表示するコマンド',
        usage: '',
        owneronly: false,
        adminonly: false,
        category: 'Minecraft',
    },

    data: new SlashCommandBuilder()
        .setName('homeserverstatus')
        .setDescription('おうちサーバーの状態を表示する')
        .addSubcommand(subcommand => {
            return subcommand
                .setName('rpg')
                .setDescription('RPG鯖の状態表示');
        })
        .addSubcommand(subcommand => {
            return subcommand
                .setName('batrowa')
                .setDescription('バトロワ鯖の状態表示');
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const command = interaction.options.getSubcommand(true);
            switch (command) {
                case 'pmmp':
                    util.statusBedrock('outiserver.com', { port: 19132, timeout: 5000 })
                        .then(async result => {
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                                            .addField('IPアドレス', result.host)
                                            .addField('ポート', result.port.toString())
                                            .addField('サーバーのバージョン', result.version)
                                            .addField('デフォルトゲームモード', result.gameMode)
                                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error => errorlog(interaction, error));
                        })
                        .catch(async error => {
                            clienterrorlog(client, error);
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                                            .setDescription('おうちサーバー(PMMP)は現在落ちてます')
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error_ => clienterrorlog(client, error_));
                        });
                    break;
                case 'rpg':
                    util.statusBedrock('outiserver.com', { port: 19135, timeout: 5000 })
                        .then(async result => {
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(RPG)の現在の状態🏠')
                                            .addField('IPアドレス', result.host)
                                            .addField('ポート', result.port.toString())
                                            .addField('サーバーのバージョン', result.version)
                                            .addField('デフォルトゲームモード', result.gameMode)
                                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error => errorlog(interaction, error));
                        })
                        .catch(async error => {
                            clienterrorlog(client, error);
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(RPG)の現在の状態🏠')
                                            .setDescription('おうちサーバー(RPG)は現在落ちてます')
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error_ => clienterrorlog(client, error_));
                        });
                    break;
                case 'batrowa':
                    util.statusBedrock('outiserver.com', { port: 19134, timeout: 5000 })
                        .then(async result => {
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(バトロワ)の現在の状態🏠')
                                            .addField('IPアドレス', result.host)
                                            .addField('ポート', result.port.toString())
                                            .addField('サーバーのバージョン', result.version)
                                            .addField('デフォルトゲームモード', result.gameMode)
                                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error => errorlog(interaction, error));
                        })
                        .catch(async error => {
                            clienterrorlog(client, error);
                            await interaction.followUp(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('🏠おうちサーバー(バトロワ)の現在の状態🏠')
                                            .setDescription('おうちサーバー(バトロワ)は現在落ちてます')
                                            .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                                            .setColor('RANDOM')
                                            .setTimestamp(),
                                    ],
                                },
                            )
                                .then(msg => setTimeout(() => msg.delete(), 5000))
                                .catch(error_ => clienterrorlog(client, error_));
                        });
                    break;
                default:
                    await interaction.followUp('エラー');
                    break;
            }

        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};