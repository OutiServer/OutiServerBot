const { Client, Message } = require("discord.js");

module.exports = {

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {*} error
     */

    errorlog: async function (client, message, error) {
        console.error(error);
        try {
            client.users.cache.get('714455926970777602').send('Error\n' + error.stack, { code: true, split: true });
            message.channel.send('Error\n' + error.stack, { code: true, split: true });
        }
        catch (error) { }
    },

    /**
     * @param {Client} client
     * @param {string} channelid
     * @param {*} error
     */

    clienterrorlog: async function (client, error) {
        console.error(error);
        try {
            client.users.cache.get('714455926970777602').send('Error\n' + error.stack, { code: true, split: true });
        }
        catch (error) { }
    }
}