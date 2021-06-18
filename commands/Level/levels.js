const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionController } = require('discord.js-reaction-controller');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "levels",
        description: "おうちlevelランキング",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            const all = client.db.prepare("SELECT * FROM levels ORDER BY allxp DESC;").all();
            const embeds = [];
            let ranknumber1 = 1;
            let ranknumber2 = 10;
            let rank = 1;
            const bans = await message.guild.fetchBans();

            for (let i = 0; i < Math.ceil(all.length / 10); i++) {
                embeds.push(
                    new MessageEmbed()
                        .setTitle(`おうち鯖Levelランキング${ranknumber1}〜${ranknumber2}位`)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                ranknumber1 += 10;
                ranknumber2 += 10;
            }

            for (const data of all) {
                let user = client.users.cache.get(data.user);
                if (!user) {
                    user = (await client.users.fetch(data.user)).tag;
                }

                if (bans.get(data.user)) {
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:banned:852517393636917258>`, `${data.level}Level ${data.xp}経験値`);
                }
                else if (message.guild.member(user.id)) {
                    if (message.guild.member(user.id).roles.cache.has('739473593674629120')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:boost:855244574430461972>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else if (message.guild.member(user.id).roles.cache.has('780381600751812638')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:DeadCrew:852517409331609610>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag}`, `${data.level}Level ${data.xp}経験値`);
                    }
                }
                else {
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag}`, `${data.level}Level ${data.xp}経験値`);
                }
                rank++;
            }

            const controller = new ReactionController(client);
            controller.addPages(embeds);
            controller.sendTo(message.channel, message.author)
                .catch(console.error);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}