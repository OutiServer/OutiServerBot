const { Message, MessageReaction, User, ReactionCollector } = require('discord.js');
const bot = require('../bot');
const { clienterrorlog } = require('./logs/error');

/**
 * @param {bot} client
 * @param {Message} message
 * @param {string} gamertag
 * @param {string} verifyuserid
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {ReactionCollector} Collector
 */

module.exports = async (client, message, gamertag, verifyuserid, reaction, user, Collector) => {
    try {
        if (user.bot) return;
        if (reaction.emoji.id === '844941572679794688') {
            const data = {
                id: `${verifyuserid}-${gamertag}`,
                user: verifyuserid,
                tag: gamertag
            };
            client.db.prepare('INSERT INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
            await client.guilds.cache.get('706452606918066237').member(verifyuserid).roles.add('821715178147020800');
            await message.edit('申請を承諾しました！');
            await message.reactions.removeAll();
            Collector.stop();
        }
        else if (reaction.emoji.id === '844941573422186497') {
            await client.channels.cache.get('797008715646500865').send(`<@${verifyuserid}>、申請が却下されました。`);
            await message.edit('申請を承諾しませんでした！');
            Collector.stop();
        }
    } catch (error) {
        clienterrorlog(error);
    }
    finally {
        Collector.stop();
    }
}