const { codeBlock } = require('@discordjs/builders');
const { CommandInteraction, WebhookClient, MessageEmbed } = require('discord.js');
const Bot = require('../../Utils/Bot');
const { clienterrorlog } = require('./error');

/**
 * コマンドログ関数
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 * @param {string} commandname
 */

module.exports = async (client, interaction, commandname) => {
    try {
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873903295331205170/kiuj7x2uJUWkPeovgX1LrDYDXegmG5SA28gJHN6Joc9dMRgz4CIPNGHMeLA3dJKbBrZR' });
        await webhook.send({
            embeds: [
                new MessageEmbed()
                    .addField('コマンド実行者', interaction.user.tag)
                    .addField('コマンド実行者ID', interaction.user.id)
                    .addField('コマンド実行ギルド', interaction.guild.name)
                    .addField('コマンド実行ギルドID', interaction.guild.id)
                    .addField('コマンド実行チャンネル', interaction.channel.name)
                    .addField('コマンド実行チャンネルID', interaction.channel.id)
                    .addField('コマンド', codeBlock(commandname))
                    .addField('オプション', codeBlock('css', `[SubCommand]\n${interaction.options.data.filter(v => v.type === 'SUB_COMMAND').map(subcommand => `${subcommand.name};`).join('\n')}\n\n[SubCommandGroup]\n${interaction.options.data.filter(v => v.type === 'SUB_COMMAND_GROUP').map(subcommandgroup => `${subcommandgroup.name};`).join('\n')}\n\n[String]\n${interaction.options.data.filter(v => v.type === 'STRING').map(StringOptions => `${StringOptions.name}: ${StringOptions.value};`).join('\n')}\n\n[Integer]\n${interaction.options.data.filter(v => v.type === 'INTEGER').map(intoptions => `${intoptions.name}: ${intoptions.value.toString()};`).join('\n')}\n\n[Boolean]\n${interaction.options.data.filter(v => v.type === 'BOOLEAN').map(booloptions => `${booloptions.name}: ${booloptions.value.toString()};`).join('\n')}\n\n[User]\n${interaction.options.data.filter(v => v.type === 'USER').map(user => `${user.name}: ${user.user.username}(${user.user.id});`).join('\n')}\n\n[Channel]\n${interaction.options.data.filter(v => v.type === 'CHANNEL').map(channel => `${channel.name}: ${channel.channel.name}(${channel.channel.id});`).join('\n')}\n\n[Role]\n${interaction.options.data.filter(v => v.type === 'ROLE').map(role => `${role.name}: ${role.role.name}(${role.role.id});`).join('\n')}\n\n[Mention]\n${interaction.options.data.filter(v => v.type === 'MENTIONABLE').map(mention => `${mention.name}: ${mention.user.username}(${mention.user.id});`).join('\n')}\n\n[Number]\n${interaction.options.data.filter(v => v.type === 'NUMBER').map(number => `${number.name}: ${number.value.toString()};`).join('\n')}\n\n`))
                    .setImage(interaction.user.avatarURL({ format: 'webp' }))
                    .setColor('RANDOM')
                    .setFooter(`messageid: ${interaction.id}`, interaction.user.avatarURL({ format: 'webp' }))
                    .setTimestamp(),
            ],
            username: `${client.user.username}-コマンド実行ログ`,
            avatarURL: client.user.avatarURL({ format: 'webp' }),
        });
    }
 catch (error) {
        clienterrorlog(client, error);
    }
};