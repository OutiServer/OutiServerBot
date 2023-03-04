const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'eval',
        description: '危ないコマンド',
        category: 'admin',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('危ないコマンド')
         .addStringOption(option => {
      return option
        .setName('code')
        .setDescription('こで')
        .setRequired(true);
    }),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.user.id !== "714455926970777602") return await interaction.followUp('このコマンドはKen_Cirしか実行できません');
      
        const user = interaction.options.getUser('code', true);
        const data = eval(args.join(' ').replace(/```/g, ''))
        
        await interaction.followUp(`${data}`);
    },
};
