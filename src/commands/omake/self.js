const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'self',
        description: 'selfbot検知しました',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Omake',
    },

    data: new SlashCommandBuilder()
        .setName('self')
        .setDescription('selfbot検知しました'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            await interaction.followUp(
                {
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`<@${interaction.user.id}>さん、selfbot検知しました\n問答無用で永BANです＾＾`)
                            .setColor('RANDOM')
                            .setTimestamp(),
                    ],
                },
            );
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};