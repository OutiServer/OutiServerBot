const { Client, Message, MessageEmbed } = require('discord.js');
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
            let embeds = [];
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
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:ban:842003176626192384>`, `${data.level}Level ${data.xp}経験値`);
                }
                else if (message.guild.member(user.id)) {
                    if (message.guild.member(user.id).roles.cache.has('739473593674629120')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:serverbooster:842067279160279081>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else if (message.guild.member(user.id).roles.cache.has('780381600751812638')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:DeadCrew1:778271180888080394>`, `${data.level}Level ${data.xp}経験値`);
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

            const msg = await message.channel.send('```' + `1/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[0]);
            while (true) {
                const filter = msg => msg.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
                const response = collected.first();
                if (!response) {
                    msg.edit('');
                    break;
                }
                else if (response.content === '0') {
                    response.delete();
                    msg.edit('');
                    break;
                }
                else {
                    const selectembed = Number(response.content);
                    if (selectembed > 0 && selectembed < embeds.length + 1) {
                        response.delete();
                        msg.edit('```' + `${selectembed}/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[selectembed - 1]);
                    }
                }
            }
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}