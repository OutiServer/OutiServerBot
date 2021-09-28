const { codeBlock, userMention } = require("@discordjs/builders");
const { WebhookClient, MessageEmbed, CommandInteraction } = require("discord.js");
const Bot = require("../../Utils/Bot");

module.exports = {

    /**
     * エラーログ出力用
     * @param {Bot} client
     * @param {CommandInteraction} interaction
     * @param {Error} error
     */
    errorlog: async function (client, interaction, error) {
        console.error(error);
        try {
            if (!client.user) return;
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send({
                content: `${userMention(process.env.OWNERID)}\n${codeBlock(error.stack)}`,
                avatarURL: interaction.client.user.avatarURL({ format: 'webp' }),
                username: `${interaction.client.user.username}-エラーログ`
            });
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
     * @param {Bot} client
     * @param {string} channelid
     * @param {Error} error
     */
    clienterrorlog: async function (client, error) {
        console.error(error);
        try {
            if (!client.user) return;
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send({
                content: `${userMention(process.env.OWNERID)}\n${codeBlock(error.stack)}`,
                avatarURL: interaction.client.user.avatarURL({ format: 'webp' }),
                username: `${interaction.client.user.username}-エラーログ`
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}