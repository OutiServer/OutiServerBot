const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'rename',
        description: 'スレッド名変更',
        usage: '[新しいスレッド名]',
        aliases: [],
        category: 'main',
    },

    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('スレッド名を変更する')
        .addStringOption(option => {
            return option
                .setName('threadname')
                .setDescription('新しいスレッド名')
                .setRequired(true);
        }),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            if (!interaction.channel.isThread()) return await interaction.followUp('このコマンドはスレッドチャンネルで使用できます');
            const name = interaction.options.getString('threadname', true);
            if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && interaction.channel.ownerId !== interaction.user.id) return await interaction.followUp('このスレッドの名前を変更することができません');
            await interaction.channel.setName(name, `Renamed By ${interaction.user.tag}`);
            await interaction.followUp(`このスレッド名を${name}に変更しました`);
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
            if (!message.channel.isThread()) {
                return await message.reply('このコマンドはスレッドチャンネルで使用できます');
            }
            else if (!args[0]) {
                return await message.reply('引数に新しいスレッド名を入れてください');
            }
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && message.channel.ownerId !== message.user.id) return await message.reply('このスレッドの名前を変更することができません');
            await message.channel.setName(args.join(' '), `Renamed By ${message.author.tag}`);
            await message.reply(`このスレッド名を${args.join(' ')}に変更しました`);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};