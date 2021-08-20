require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync, } = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const commands = [];

const commandFolders = readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        /**
         * @type { info: { name: string, description: string, usage: string, aliases: string[], owneronly: boolean, adminonly: boolean, category: string }, data: SlashCommandBuilder, run: function(Client, Message, string[]): Promise<Message>}
         */
        const command = require(`./commands/${folder}/${file}`);
        if (!command.data) continue;
        commands.push(command.data);
        console.log(`${command.info.name} command is Added`);
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, '872880984205430834'),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();