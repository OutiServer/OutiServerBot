const { SlashCommandBuilder } = require('@discordjs/builders');
const { spawn } = require('child_process');

module.exports = {
    info: {
        name: 'restart',
        description: '再起動コマンド',
        usage: '',
        aliases: [],
        category: 'owner',
    },

    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('再起動コマンド'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp('再起動しています...');

        if (process.env.process_restarting) {
            delete process.env.process_restarting;
            setTimeout(this.run, 1000);
            return;
        }

        spawn(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: 'ignore',
        }).unref();

        process.exit();
    },
};