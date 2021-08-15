const { Interaction, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');

/**
 * @param {bot} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {
    if (interaction.user.bot) return;
    if (interaction.isButton()) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.customId === 'amongus') {
            if (interaction.member.roles.cache.has('774593459034128395')) {
                await interaction.member.roles.remove('774593459034128395');
                await interaction.editReply('Among Us Crewを剥奪しました');
            }
            else {
                await interaction.member.roles.add('774593459034128395');
                await interaction.editReply('Among Us Crewを付与しました');
            }

        }
        else if (interaction.customId === 'Temporaryannounce') {
            if (interaction.member.roles.cache.has('780217228649562113')) {
                await interaction.member.roles.remove('780217228649562113');
                await interaction.editReply('臨時お知らせを剥奪しました');
            }
            else {
                await interaction.member.roles.add('780217228649562113');
                await interaction.editReply('臨時お知らせを付与しました\n10分後自動で剥奪します');
                setTimeout(async () => {
                    await interaction.member.roles.remove('780217228649562113');
                }, 600000)
            }
        }
        else if (interaction.customId === 'zatudan') {
            if (interaction.member.roles.cache.has('825232499151470643')) {
                await interaction.member.roles.remove('825232499151470643');
                await interaction.editReply('雑談を剥奪しました');
            }
            else {
                await interaction.member.roles.add('825232499151470643');
                await interaction.editReply('雑談を付与しました');
            }
        }
        else if (interaction.customId === 'announce') {
            if (interaction.member.roles.cache.has('826994784614219846')) {
                await interaction.member.roles.remove('826994784614219846');
                await interaction.editReply('お知らせを剥奪しました');
            }
            else {
                await interaction.member.roles.add('826994784614219846');
                await interaction.editReply('お知らせを付与しました');
            }
        } else if (interaction.customId === 'inquiry') {
            const ticketid = client.db.prepare('SELECT * FROM sqlite_sequence WHERE name = ?').get('inquirys');
            console.log(ticketid);
            const channel = await client.guilds.cache.get('706452606918066237').channels.create(`${ticketid.seq + 1}-お問い合わせ`,
                {
                    type: 'text',
                    parent: '821684794056245258',
                    topic: `${interaction.user}さん専用のお問い合わせチャンネル`,
                    permissionOverwrites: [
                        {
                            id: '706452606918066237',
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: '771015602180587571',
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: '822852335322923060',
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                });


            client.db.prepare('INSERT INTO inquirys (userid, channelid) VALUES (?, ?)').run(interaction.user.id, channel.id);
            await channel.send({
                content: `${interaction.user}さん専用のお問い合わせチャンネルを作成しました！`,
                embeds: [new MessageEmbed()
                    .setDescription(`こちらのチャンネルでお問い合わせ内容の記載をお願いします\n解決した場合は \`${process.env.PREFIX}close\` でお問い合わせを閉じることができます`)
                    .setColor('RANDOM')
                    .setTimestamp()]
            });
            await interaction.editReply(`お問い合わせチャンネルを作成しました ${channel}`);
        }
    }
}