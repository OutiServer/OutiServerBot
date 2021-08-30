const { MessageEmbed, CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "rankset",
        description: "rank画像画像の調整",
        usage: "",

        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    data: new SlashCommandBuilder()
        .setName('rankset')
        .setDescription('rank画像画像の調整')
        .addSubcommand(subcommand => {
            return subcommand
                .setName('color')
                .setDescription('色設定')
                .addStringOption(option => {
                    return option
                        .setName('color')
                        .setDescription('16進数色')
                        .setRequired(true);
                })
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const userrankimagedata = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(interaction.user.id);
            if (!userrankimagedata) return await interaction.followUp('あなたはまだrank画像を設定していないようです');
            const command = interaction.options.getSubcommand();
            if (command === 'color') {
                const color = interaction.options.getString('color', true);
                userrankimagedata.barcolor = color;
                client.db.prepare('UPDATE rankimages SET barcolor = ? WHERE id = ?').run(userrankimagedata.barcolor, userrankimagedata.id);
                await interaction.followUp({
                    content: `文字カラーを${userrankimagedata.barcolor}に設定しました！`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }
            else {
                await interaction.followUp(
                    new MessageEmbed()
                        .setTitle('ranksetで設定できる項目')
                        .setDescription('`color`')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
        } catch (error) {
            errorlog(interaction, error);
        }
    }
}