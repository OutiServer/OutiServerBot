const { readdirSync } = require('fs');
const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const cron = require('node-cron');
const bot = require('../../Utils/Bot');

const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "reload",
        description: "全てのコマンドを読み込み直すコマンド",
        usage: "",

        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('全てのコマンドを読み込み直すコマンド'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            client.commands.clear();
            const commandFolders = readdirSync('./commands');
            for (const folder of commandFolders) {
                const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
                    const command = require(`../../commands/${folder}/${file}`);
                    client.commands.set(command.info.name, command);
                    console.log(`${command.info.name} command is ReLoading`);
                }
            }

            await interaction.followUp({
                content: `計${client.commands.size}個のコマンドをリロードしました`
            });
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {

        }
    },
};