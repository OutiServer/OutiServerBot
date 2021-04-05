const { Client } = require("discord.js");

module.exports = {
    info: {
        name: "kill",
        description: "対象プレイヤーや Mob やアイテムなどのエンティティを死亡・消滅させる。",
        usage: "killするuser",
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
                    content: `<@${args[0].value}>をkillしました\n<@${args[0].value}>は力尽きた`
                }
            }
        });
    }
}