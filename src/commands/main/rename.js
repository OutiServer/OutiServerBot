const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'rename',
        description: 'スレッド名変更',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('スレッド名を変更する')
        .addStringOption(option => {
            return option
                .setName('threadname')
                .setDescription('スレッド名')
                .setRequired(true);
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.channel.isThread()) return await interaction.followUp({ content: 'そのコマンドはスレッドでのみ使用できます' });
            const name = interaction.options.getString('threadname', true);
            const threads = client.db.prepare('SELECT * FROM threads WHERE channelid = ? AND userid = ?').get(interaction.channelId, interaction.user.id);
            if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && !threads) return await interaction.followUp({ content: 'このスレッドの名前を変更することができません' });
            await client.channels.cache.get('870145872762126437').threads.cache.get(interaction.channelId).setName(name, `Renamed By ${interaction.user.tag}`);
            await interaction.followUp({
                content: `このスレッド名を${name}に変更しました`,
            });
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};