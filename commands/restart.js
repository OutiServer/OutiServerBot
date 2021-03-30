const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "restart",
        description: "再接続",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        message.channel.send('再接続しています...')
            .then(() => client.destroy())
            .then(() => client.login(process.env.DISCORD_TOKEN))
            .then(() => message.channel.send('再接続が完了しました'));
    },
};