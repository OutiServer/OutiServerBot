const { codeBlock } = require("@discordjs/builders");
const { WebhookClient, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {

    /**
     * エラーログ出力用
     * @param {CommandInteraction} interaction
     * @param {*} error
     */

    errorlog: async function (interaction, error) {
        console.error(error);
        try {
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send(codeBlock(error.stack));
            await interaction.followUp({
                content: 'コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉',
                embeds: [
                    new MessageEmbed()
                        .setDescription(`ErrorMessage: ${error.message}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                ]
            });
        }
        catch (error) {
            console.error(error);
        }
    },

    /**
     * エラーログ出力用
     * @param {string} channelid
     * @param {*} error
     */

    clienterrorlog: async function (error) {
        console.error(error);
        try {
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send(codeBlock(error.stack));
        }
        catch (error) {
            console.error(error);
        }
    }
}