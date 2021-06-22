const { Message, MessageEmbed } = require("discord.js");
const { ReactionController } = require('discord.js-reaction-controller');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "tags",
        description: "現在登録されているゲーマータグ全集",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const all = client.db.prepare("SELECT * FROM gamertags ORDER BY id DESC;").all();
            const embeds = [];
            let count = 1;

            for (let i = 0; i < Math.ceil(all.length / 10); i++) {
                embeds.push(
                    new MessageEmbed()
                        .setTitle('GamerTag')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }

            for (const data of all) {
                const user = client.users.cache.get(data.user);
                let usertag = ''
                if (!user) {
                    usertag = `User left[$${data.user}]`;
                }
                else {
                    usertag = user.tag;
                }
                embeds[Math.ceil(count / 10) - 1].addField(usertag, data.tag);
                count++;
            }

            const controller = new ReactionController(client);
            controller.addPages(embeds);
            await controller.sendTo(message.channel, message.author);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}