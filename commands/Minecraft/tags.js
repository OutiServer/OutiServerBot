const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require("../../functions/error");

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
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            const all = client.db.prepare("SELECT * FROM gamertags ORDER BY id DESC;").all();
            let embeds = [];
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
                const user = message.guild.member(data.user);
                let usertag = ''
                if (!user) {
                    usertag = '取得不可User';
                }
                else {
                    usertag = user.user.tag;
                }
                embeds[Math.ceil(count / 10) - 1].addField(usertag, data.tag);
                count++;
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
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}