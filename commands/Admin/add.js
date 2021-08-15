const { Message } = require("discord.js");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const user = message.mentions.users.first() || message.guild.member(args[0]);
            if (!user) return message.reply({
                content: '経験値を付与するユーザーをメンションするかIDを第一引数に入れてください！',
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));


            const addxp = Number(args[1]);
            if (!addxp) return message.reply({
                content: '経験値を付与する数を第二引数に入れてください！',
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));

            let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(user.id);
            if (!userleveldata) {
                userleveldata = { id: `${user.id}`, user: user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
            }

            userleveldata.xp += addxp;
            userleveldata.allxp += addxp;

            while (userleveldata.xp >= userleveldata.level * 55) {
                userleveldata.xp -= userleveldata.level * 55;
                userleveldata.level++;
            }

            client.db.prepare('UPDATE levels SET level, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);
            message.reply({
                content: `${user}に${addxp}経験値付与しました！`,
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}