const { Client, Message } = require("discord.js");
const { errorlog } = require("../functions/error");

module.exports = {
    info: {
        name: "mention",
        description: "ホワイトリストに書いていない人にメンションを飛ばす",
        usage: "",
        aliases: ["m"],
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
            const allusers = message.guild.members.cache.map(user => user.id);
            const notrolesusers = [];

            for (const data of allusers) {
                if (!message.guild.member(data).roles.cache.has('821715178147020800')) {
                    notrolesusers.push('<@' + data + '>');
                }
            }

            client.channels.cache.get('797008715646500865').send(notrolesusers.join('\n') + '\n<#825536134054543412>のグーグルフォームへの記入お願いします。\nわからない場合はこのチャンネルで聞いてください！');
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}