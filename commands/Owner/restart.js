const { Message } = require('discord.js');
const bot = require('../../Utils/Bot');
const SQLite = require("better-sqlite3");
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "restart",
        description: "DiscordAPIに再接続し直すコマンド\n接続状況が悪い時はこのコマンドを使おう",
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
            const msg = await message.channel.send({
                content: '再接続しています...',
                allowedMentions: {
                    repliedUser: false
                }
            });
            client.db.close();
            client.destroy();
            client.db = new SQLite('outiserver.db');
            await client.login(process.env.DISCORD_TOKEN);
            await msg.edit('再接続が完了しました');
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};