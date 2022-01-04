const { codeBlock } = require('@discordjs/builders');
const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {

    /**
     * エラーログ出力用
     * @param {import('../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     * @param {Error} error
     */
    errorlog: async function (client, interaction, error) {
        try {
            if (['Collector received no interactions before ending with reason: time', 'Collector received no interactions before ending with reason: messageDelete'].includes(error.message)) return;
            console.error(error);
            if (!client.user) return;
            const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
            await webhook.send({
                content: codeBlock(error.stack),
                avatarURL: client.user.avatarURL({ format: 'webp' }),
                username: `${client.user.username}-エラーログ`,
            });
            await interaction.followUp({
                content: 'コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉',
                embeds: [
                    new MessageEmbed()
                        .setDescription(`ErrorMessage: ${error.message}`)
                        .setColor('RANDOM')
                        .setTimestamp(),
                ],
            });
        }
        catch (error_) {
            console.error(error_);
        }
    },

    /**
     *
     * @param {import('../utils/Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Error} error
     */
    async commanderror_message(client, message, error) {
        try {
            if (['Collector received no interactions before ending with reason: time', 'Collector received no interactions before ending with reason: messageDelete'].includes(error.message)) return;
            console.error(error);
            if (!client.user) return;
            const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
            await webhook.send({
                content: `${codeBlock(error.stack)}`,
                avatarURL: client.user.avatarURL({ format: 'webp' }),
                username: `${client.user.username}-エラーログ`,
            });
            await message.reply({
                content: 'コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉',
                embeds: [
                    new MessageEmbed()
                        .setDescription(`ErrorMessage: ${error.message}`)
                        .setColor('RANDOM')
                        .setTimestamp(),
                ],
            });
        }
        catch (error_) {
            console.error(error_);
        }
    },

    /**
     * エラーログ出力用
     * @param {import('../utils/Bot')} client
     * @param {Error} error
     */
    clienterrorlog: async function (client, error) {
        try {
            if (['Collector received no interactions before ending with reason: time', 'Collector received no interactions before ending with reason: messageDelete'].includes(error.message)) return;
            console.error(error);
            if (!client.user) return;
            const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
            await webhook.send({
                content: `${codeBlock(error.stack)}`,
                avatarURL: client.user.avatarURL({ format: 'webp' }),
                username: `${client.user.username}-エラーログ`,
            });
        }
        catch (error_) {
            console.error(error_);
        }
    },
};