const fs = require('fs');
const request = require('request');
const { Message, MessageEmbed, CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog, clienterrorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'request',
        description: 'rank画像リクエスト',
        usage: '[imageurl]',

        owneronly: false,
        adminonly: false,
        category: 'Level',
    },
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('rank画像リクエスト')
        .addStringOption(option => {
            return option
                .setName('imageurl')
                .setDescription('画像URL')
                .setRequired(true);
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(interaction.user.id);
            if (userleveldata.level < 10) return await interaction.followUp('レベル背景申請はLevel10以上になってから使用できます！');

            request(
                {
                    method: 'GET',
                    url: interaction.options.getString('imageurl', true),
                    encoding: null,
                },
                async function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        fs.writeFileSync(`./dat/images/${interaction.user.id}.png`, body, 'binary');
                        if (!client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(interaction.user.id)) {
                            client.db.prepare('INSERT INTO rankimages VALUES (?, ?, ?)').run(interaction.user.id, interaction.guildId, '#ffffff');
                        }

                        await interaction.followUp('level画像を設定しました！');
                    }
                    else {
                        await interaction.followUp(
                            {
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle('画像保存中にエラーが発生しました')
                                        .setDescription(`statusCode: ${response.statusCode}\n${error}`)
                                        .setColor('RANDOM')
                                        .setTimestamp(),
                                ],
                            },
                        );
                        clienterrorlog(client, error);
                    }
                },
            );
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};