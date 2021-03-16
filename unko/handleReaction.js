const { Client } = require('discord.js');
const { Database } = require('./index');
const db = new Database('unkoserver.db');

module.exports = {
    /**
     * @param {Client} client
     */
    run: async function (client) {
        const handleReaction = async (channelID, messageID, callback) => {
            const channel = await client.channels.fetch(channelID);
            const message = await channel.messages.fetch(messageID);
            const collector = message.createReactionCollector(() => true);
            collector.on('collect', (reaction, user) => callback(reaction, user));
        }

        handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
            if (reaction.emoji.id === '790538555407597590') {
                if (reaction.message.guild.member(user).roles.cache.has('717326376516190221')) {
                    reaction.message.guild.member(user).roles.remove('717326376516190221');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を剥奪しました`);
                    reply.delete({ timeout: 5000 });
                }
                else {
                    reaction.message.guild.member(user).roles.add('717326376516190221');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を付与しました`);
                    reply.delete({ timeout: 5000 });
                }
            }
            else if (reaction.emoji.id === '774598967459446784') {
                if (reaction.message.guild.member(user).roles.cache.has('774593459034128395')) {
                    reaction.message.guild.member(user).roles.remove('774593459034128395');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを剥奪しました`);
                    reply.delete({ timeout: 5000 });
                }
                else {
                    reaction.message.guild.member(user).roles.add('774593459034128395');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを付与しました`);
                    reply.delete({ timeout: 5000 });
                }
            }
            else if (reaction.emoji.id === '790546684710223882') {
                if (reaction.message.guild.member(user).roles.cache.has('780217228649562113')) {
                    reaction.message.guild.member(user).roles.remove('780217228649562113');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを剥奪しました`);
                    reply.delete({ timeout: 5000 });
                }
                else {
                    reaction.message.guild.member(user).roles.add('780217228649562113');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを付与しました\n10分後自動で剥奪します`);
                    reply.delete({ timeout: 5000 });
                    setTimeout(() => {
                        reaction.message.guild.member(user).roles.remove('780217228649562113');
                    }, 600000)
                }
            }
            else if (reaction.emoji.id === '798179606166634516') {
                if (!reaction.message.guild.member(user).roles.cache.has('814095138443100191')) {
                    reaction.message.guild.member(user).roles.add('814095138443100191');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} 生活要素班を付与しました`);
                    reply.delete({ timeout: 5000 });
                }
            }
            else if (reaction.emoji.id === '798179591582908446') {
                if (!reaction.message.guild.member(user).roles.cache.has('814070465064599593')) {
                    reaction.message.guild.member(user).roles.add('814070465064599593');
                    const reply = await client.channels.cache.get('774594290679545886').send(`${user} ミニゲーム班を付与しました`);
                    reply.delete({ timeout: 5000 });
                }
            }
        });

        handleReaction('802079467739676692', '802115362526330930', async (reaction, user) => {
            let usermoneydata = db.MoneyGet(user.id, '706452606918066237');
            if (usermoneydata.tuna === 1) {
                const reply = await client.channels.cache.get('802079467739676692').send(`${user}、お前借金返済中やん！`);
                reply.delete({ timeout: 5000 });
                return;
            }
            if (reaction.emoji.name === '0️⃣') {
                usermoneydata.ticket++;
                usermoneydata.money -= 5000;
                const reply = await client.channels.cache.get('802079467739676692').send(`${user}、うんこチケットを5000うんコインで購入しました。`);
                reply.delete({ timeout: 5000 });
            }
            db.MoneySet(usermoneydata);
        });
    }
}