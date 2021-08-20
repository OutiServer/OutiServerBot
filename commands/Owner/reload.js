const fs = require('fs');
const { Message } = require('discord.js');
const bot = require('../../Utils/Bot');

const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "reload",
        description: "全てのコマンドを読み込み直すコマンド",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            client.commands.clear();
            const commandFolders = fs.readdirSync('./commands');
            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
                    const command = require(`../../commands/${folder}/${file}`);
                    client.commands.set(command.info.name, command);
                    console.log(`${command.info.name} command is ReLoading`);
                }
            }

            message.reply({
                content: `計${client.commands.size}個のコマンドをリロードしました`,
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};