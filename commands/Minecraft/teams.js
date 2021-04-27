const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require("../../functions/error");

module.exports = {
    info: {
        name: "teams",
        description: "国メンバー表示",
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
            const all = client.db.prepare("SELECT * FROM countrys ORDER BY leader DESC;").all();
            let embeds = [];
            for (const data of all) {
                const role = client.guilds.cache.get('706452606918066237').roles.cache.get(data.role);
                embeds.push(
                    new MessageEmbed()
                        .setTitle(role.name)
                        .setDescription(`メンバー数: ${role.members.size}\n\nリーダー: ${message.guild.member(data.leader).user.tag}\nメンバー:\n${role.members.map(user => user.user.tag).join('\n')}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
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