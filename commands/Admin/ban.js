const { Client, Message } = require("discord.js");
const { errorlog } = require("../../functions/error");

module.exports = {
    info: {
        name: "ban",
        description: "BANNED!",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) return;
            if (client.db.prepare('SELECT * FROM bans WHERE user = ?').get(user.id)) return message.reply(`${user.tag}はBanされています！`);
            const data = { id: `${user.id}`, user: user.id };
            client.db.prepare('INSERT INTO bans (id, user) VALUES (@id, @user);').run(data);
            message.channel.send(`${user.tag}をBANしました！`);

        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}