const { readdirSync } = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'reload',
        description: '全てのコマンドを読み込み直すコマンド',
        usage: '',
        aliases: [],
        category: 'owner',
    },

    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('全てのコマンドを読み込み直すコマンド'),

    /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            client.commands.clear();
            const commandFolders = readdirSync('${__dirname}/../../commands');
            for (const folder of commandFolders) {
                const commandFiles = readdirSync(`${__dirname}/../../commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
                    const command = require(`../../commands/${folder}/${file}`);
                    client.commands.set(command.info.name, command);
                    console.log(`${command.info.name} command is ReLoading`);
                }
            }

            await interaction.followUp(`計${client.commands.size}個のコマンドをリロードしました`);
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
    // eslint-disable-next-line no-unused-vars
    run_message: async function (client, message, args) {
        try {
            client.commands.clear();
            const commandFolders = readdirSync(`${__dirname}/../../commands`);
            for (const folder of commandFolders) {
                const commandFiles = readdirSync(`${__dirname}/../../commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
                    const command = require(`../../commands/${folder}/${file}`);
                    client.commands.set(command.info.name, command);
                    console.log(`${command.info.name} command is ReLoading`);
                }
            }

            await message.reply(`計${client.commands.size}個のコマンドをリロードしました`);
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};