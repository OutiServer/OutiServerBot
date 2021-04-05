const { Client } = require("discord.js");

module.exports = {
    info: {
        name: "hello",
        description: "Hello World!",
        usage: "",
        aliases: [""],
        category: 'slash-command'
    },

    /**
     * @param {Client} client 
     * @param {any} interaction
     * @param {Array} args 
     */

    run: async function (client, interaction, args) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Hello World!`
                }
            }
        });
    }
}