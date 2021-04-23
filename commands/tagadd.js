const { Client, Message } = require("discord.js");
const { errorlog } = require("../functions/error");

module.exports = {
    info: {
        name: "tagadd",
        description: "ゲーマータグ追加",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            if (!message.member.roles.cache.has('822852335322923060') && !message.member.roles.cache.has('771015602180587571')) {
                if (client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(message.author.id)) return message.reply('あなたのゲーマータグは既に追加済みです！');
                if (!args[0]) return message.reply('第一引数にあなたのゲーマータグを入れてください！');
                const data = {
                    id: `${message.author.id}-${args[0]}`,
                    user: message.author.id,
                    tag: args[0]
                };
                client.db.prepare('INSERT INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
                message.reply('あなたのゲーマータグをDiscordアカウントとリンクしました！');
            }
            else {
                const user = client.users.cache.get(args[0]);
                if (!user) {
                    if (client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(message.author.id)) return message.reply('あなたのゲーマータグは既に追加済みです！');
                    if (!args[0]) return message.reply('第一引数にあなたのゲーマータグを入れてください！');
                    const data = {
                        id: `${message.author.id}-${args[0]}`,
                        user: message.author.id,
                        tag: args[0]
                    };
                    client.db.prepare('INSERT INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
                    message.reply('あなたのゲーマータグをDiscordアカウントとリンクしました！');
                }
                else {
                    if (client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(user.id)) return message.reply(`${user.tag}のゲーマータグは既に追加済みです！`);
                    if (!args[1]) return message.reply(`第二引数に${user.tag}のゲーマータグを入れてください！`);
                    const data = {
                        id: `${user.id}-${args[1]}`,
                        user: user.id,
                        tag: args[1]
                    };
                    client.db.prepare('INSERT INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
                    message.channel.send(`${user.tag}のゲーマータグをDiscordアカウントとリンクしました！`);
                }
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}