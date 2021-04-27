const { Client, Message } = require("discord.js");
const { errorlog } = require("../../functions/error");

module.exports = {
    info: {
        name: "add",
        description: "ユーザーに経験値追加",
        usage: "[ユーザーをメンションまたはID] [付与する経験値]",
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
            const user = message.mentions.users.first() || message.guild.member(args[0]);
            if (!user) {
                return message.reply('経験値を付与するユーザーをメンションするかIDを第一引数に入れてください！');
            }

            const addxp = Number(args[1]);
            if (!addxp) {
                return message.reply('経験値を付与する数を第二引数に入れてください！');
            }

            let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(user.id);
            if (!userleveldata) {
                userleveldata = { id: `${user.id}`, user: user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
            }

            userleveldata.xp += addxp;
            userleveldata.allxp += addxp;

            client.db.prepare('UPDATE levels SET xp = ?, allxp = ? WHERE user = ?').run(userleveldata.xp, userleveldata.allxp, userleveldata.user);

            message.channel.send(`${user}に${addxp}経験値付与しました！`);
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}