const { Client, MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('./functions/error');

module.exports = {

    /**
     * @param {Client} client
     */

    run: async function (client) {
        try {
            const handleReaction = async (channelID, messageID, callback) => {
                const channel = await client.channels.fetch(channelID);
                const message = await channel.messages.fetch(messageID);
                const collector = message.createReactionCollector(() => true);
                collector.on('collect', (reaction, user) => callback(reaction, user));
            }

            handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
                if (user.bot) return;
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
                    if (reaction.message.guild.member(user).roles.cache.has('814095138443100191')) {
                        reaction.message.guild.member(user).roles.remove('814095138443100191');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 生活要素班を剥奪しました`);
                        reply.delete({ timeout: 5000 });
                    }
                    else {
                        reaction.message.guild.member(user).roles.add('814095138443100191');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 生活要素班を付与しました`);
                        reply.delete({ timeout: 5000 });
                    }
                }
                else if (reaction.emoji.id === '798179591582908446') {
                    if (reaction.message.guild.member(user).roles.cache.has('814070465064599593')) {
                        reaction.message.guild.member(user).roles.remove('814070465064599593');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} ミニゲーム班を剥奪しました`);
                        reply.delete({ timeout: 5000 });
                    }
                    else {
                        reaction.message.guild.member(user).roles.add('814070465064599593');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} ミニゲーム班を付与しました`);
                        reply.delete({ timeout: 5000 });
                    }
                }
                else if (reaction.emoji.id === '741467052950159361') {
                    if (reaction.message.guild.member(user).roles.cache.has('825232499151470643')) {
                        reaction.message.guild.member(user).roles.remove('825232499151470643');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 雑談を剥奪しました`);
                        reply.delete({ timeout: 5000 });
                    }
                    else {
                        reaction.message.guild.member(user).roles.add('825232499151470643');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 雑談を付与しました`);
                        reply.delete({ timeout: 5000 });
                    }
                }
                else if (reaction.emoji.id === '826629936194387988') {
                    if (reaction.message.guild.member(user).roles.cache.has('826994784614219846')) {
                        reaction.message.guild.member(user).roles.remove('826994784614219846');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} お知らせを剥奪しました`);
                        reply.delete({ timeout: 5000 });
                    }
                    else {
                        reaction.message.guild.member(user).roles.add('826994784614219846');
                        const reply = await client.channels.cache.get('774594290679545886').send(`${user} お知らせを付与しました`);
                        reply.delete({ timeout: 5000 });
                    }
                }
            });

            handleReaction('821686383605055508', '821726639443673089', async (reaction, user) => {
                if (user.bot) return;
                if (reaction.emoji.name === '🎫') {
                    let ticketdata = client.db.prepare('SELECT * FROM serversettings WHERE guild = ?').get('706452606918066237');
                    if (!ticketdata) {
                        ticketdata = { id: '706452606918066237', guild: '706452606918066237', ticketid: 0, serverjoindedcase: 0 }
                        client.db.prepare('INSERT INTO serversettings (id, guild, ticketid, serverjoindedcase) VALUES (@id, @guild, @ticketid, @serverjoindedcase)').run(ticketdata);
                    }
                    client.guilds.cache.get('706452606918066237').channels.create(`${ticketdata.ticketid}-お問い合わせ`,
                        {
                            type: 'text',
                            parent: '821684794056245258',
                            topic: `<@${user.id}>さん専用のお問い合わせチャンネル`,
                            permissionOverwrites: [
                                {
                                    id: '706452606918066237',
                                    deny: ['VIEW_CHANNEL']
                                },
                                {
                                    id: user.id,
                                    allow: ['VIEW_CHANNEL']
                                },
                                {
                                    id: '771015602180587571',
                                    allow: ['VIEW_CHANNEL']
                                }
                            ]
                        })
                        .then(channel => channel.send(`${user}さん専用のお問い合わせチャンネルを作成しました！`,
                            new MessageEmbed()
                                .setDescription('こちらのチャンネルでお問い合わせ内容の記載をお願いします')
                                .setColor('RANDOM')
                                .setTimestamp())
                        );
                    client.db.prepare('UPDATE serversettings SET ticketid = ? WHERE id = ?').run(ticketdata.ticketid, ticketdata.id);
                }
            });
        } catch (error) {
            clienterrorlog(client, error);
        }
    }
}