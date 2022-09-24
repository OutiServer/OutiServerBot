const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, InteractionType, ChannelType, ButtonStyle, PermissionFlagsBits } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').Interaction} interaction
 */

module.exports = async (client, interaction) => {
    if (interaction.user.bot) return;
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case 'inquiry':
                {
                    await interaction.deferReply({ ephemeral: true });
                    const channel = await client.guilds.cache.get('706452606918066237').channels.create({
                        name: `${interaction.user.tag}-お問い合わせ`,
                        type: ChannelType.GuildText,
                        parent: '821684794056245258',
                        topic: `${interaction.user}さんのお問い合わせチャンネル`,
                        permissionOverwrites: [
                            {
                                id: '706452606918066237',
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: '771015602180587571',
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: '822852335322923060',
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                        ],
                    });

                    await interaction.editReply(`お問い合わせチャンネルを作成しました ${channel}`);
                    const msg = await channel.send({
                        content: `${interaction.user}さん専用のお問い合わせチャンネルを作成しました！`,
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('こちらのチャンネルでお問い合わせ内容の記載をお願いします\n解決した場合は `/close` でお問い合わせを閉じることができます')

                                .setTimestamp(),
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('close')
                                        .setLabel('このお問い合わせを閉じる')
                                        .setStyle(ButtonStyle.Danger),
                                ),
                        ],
                    });
                    await msg.pin();
                }
                break;
            case 'close':
                if (interaction.channel.parentId !== '821684794056245258') return;
                await interaction.reply('このお問い合わせをクローズしました');
                await interaction.channel.setParent('828268142820196372');
                break;
            case 'mention_announce':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('1014190639539306538')) {
                    await interaction.member.roles.remove('1014190639539306538');
                    await interaction.followUp('お知らせを剥奪しました');
                }
                else {
                    await interaction.member.roles.add('1014190639539306538');
                    await interaction.followUp('お知らせを付与しました');
                }
                break;
            case 'announce':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('826994784614219846')) {
                    await interaction.member.roles.remove('826994784614219846');
                    await interaction.followUp('お知らせを剥奪しました');
                }
                else {
                    await interaction.member.roles.add('826994784614219846');
                    await interaction.followUp('お知らせを付与しました');
                }
                break;
            case 'temp_announce':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('780217228649562113')) {
                    await interaction.member.roles.remove('780217228649562113');
                    await interaction.followUp('臨時お知らせを剥奪しました');
                }
                else {
                    await interaction.member.roles.add('780217228649562113');
                    await interaction.followUp('臨時お知らせを付与しました\n10分後自動で剥奪します');
                    setTimeout(async () => {
                        await interaction.member.roles.remove('780217228649562113');
                    }, 600000);
                }
                break;
            case 'among_us':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('774593459034128395')) {
                    await interaction.member.roles.remove('774593459034128395');
                    await interaction.followUp('AmongUs Crewを剥奪しました');
                }
                else {
                    await interaction.member.roles.add('774593459034128395');
                    await interaction.followUp('AmongUs Crewを付与しました');
                }
                break;
            case 'study_member':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('972467400941379625')) {
                    await interaction.member.roles.remove('972467400941379625');
                    await interaction.followUp('学ぶ者を剥奪しました');
                }
                else {
                    await interaction.member.roles.add('972467400941379625');
                    await interaction.followUp('学ぶ者を付与しました');
                }
                break;
            case 'work_call':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('969526525647020052')) {
                    await interaction.member.roles.remove('969526525647020052');
                    await interaction.followUp('作業通話を剥奪しました');
                }
                else {
                    await interaction.member.roles.add('969526525647020052');
                    await interaction.followUp('作業通話を付与しました');
                }
                break;
            case 'ghost_investigator':
                await interaction.deferReply({ ephemeral: true });
                if (interaction.member.roles.cache.has('1021294713501921290')) {
                    await interaction.member.roles.remove('1021294713501921290');
                    await interaction.followUp('幽霊調査員を剥奪しました');
                }
                else {
                    await interaction.member.roles.add('1021294713501921290');
                    await interaction.followUp('幽霊調査員を付与しました');
                }
                break;
            default:
                break;
        }
    }
    else if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'report') {
            await client.users.cache.get(process.env.OWNERID).send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${interaction.user.tag}からのReport`)
                        .addFields([
                            { name: 'タイトル', value: interaction.fields.getTextInputValue('report_title') },
                            { name: '内容', value: interaction.fields.getTextInputValue('report_content') },
                        ]),
                ],
            });
            await interaction.reply('送信しました、開発者からDMでの返信があるかもしれないのでDM解放しておいてください。');
        }
    }
    else if (interaction.type === InteractionType.ApplicationCommand) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return await interaction.reply('Error: コマンドデータが見つかりませんでした');
        else if (cmd.info.category === 'owner' && interaction.user.id !== process.env.OWNERID || cmd.info.category === 'admin' && !interaction.member.roles.cache.has('822852335322923060') && !interaction.member.roles.cache.has('771015602180587571') && !interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply('そのコマンドを使用するための権限が足りてないで。😉');

        if (cmd.info.ephemeral && cmd.info.deferReply) await interaction.deferReply({ ephemeral: true });
        else if (cmd.info.deferReply) await interaction.deferReply();

        cmd.run(client, interaction);

        const date = new Date();
        if (!client.database.getStudy(interaction.user.id, date.getFullYear(), date.getMonth() + 1, date.getDate())) {
            client.database.addStudy(interaction.user.id, date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }
};