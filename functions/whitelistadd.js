const { Client, Message, MessageReaction, User } = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string} gamertag
 * @param {string} verifyuserid
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = async (client, message, gamertag, verifyuserid, reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.id === '810436146718441483') {
        const data = {
            id: `${verifyuserid}-${gamertag}`,
            user: verifyuserid,
            tag: gamertag
        };
        client.db.prepare('INSERT INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
        client.guilds.cache.get('706452606918066237').member(verifyuserid).roles.add('821715178147020800');
        message.edit('申請を承諾しました！');
        message.reactions.removeAll();
    }
    else if (reaction.emoji.id === '810436146978619392') {
        message.edit('申請を承諾しませんでした！');
        message.reactions.removeAll();
        client.channels.cache.get('797008715646500865').send(`<@${verifyuserid}>、申請が却下されました。`);
    }
}