const { Message } = require('discord.js');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "exit",
        description: "再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた",
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
            client.db.close();
            client.connection.destroy();
            client.destroy();
            process.exit();
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};