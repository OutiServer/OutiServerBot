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
            client.channels.cache.get('832147424565919784').send('Error\n' + error.stack, { code: true, split: true });
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
            client.channels.cache.get('832147424565919784').send('Error\n' + error.stack, { code: true, split: true });
        }
        catch (error) { }
    }
}