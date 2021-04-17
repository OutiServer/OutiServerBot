const { Client } = require("discord.js");
const { clienterrorlog } = require("../functions/error");

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
        try {
            const nickname = client.guilds.cache.get('706452606918066237').member(args[0].value).nickname || client.users.cache.get(args[0].value).username;
            client.guilds.cache.get('706452606918066237').member(args[0].value).setNickname(`故 ${nickname}`);
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `<@${args[0].value}>をkillしました\n\n<@${args[0].value}>は力尽きた`
                    }
                }
            });
        } catch (error) {
            clienterrorlog(client, error);
        }
    }
}