const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: "countryadd",
        description: "国追加",
        usage: "[リーダーのユーザーID] [国ロールID]",
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
            const leader = message.guild.member(args[0]);
            const role = message.guild.roles.cache.get(args[1]);
            if (!leader || !role) return message.reply('第一引数に国リーダーのユーザーID、第二引数に国ロールIDを入れてください！');

            const data = { id: `${leader.id}-${role.id}`, leader: leader.id, role: role.id };
            client.db.prepare('INSERT INTO countrys (id, leader, role) VALUES (@id, @leader, @role);').run(data);

            message.channel.send(
                new MessageEmbed()
                    .setTitle('国追加完了')
                    .addField('国リーダー', leader.user.tag)
                    .addField('国ロール', `<@&${role.id}>`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}