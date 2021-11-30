const { MessageAttachment, CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Rank } = require('canvacord');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'rank',
        description: '自分のLevel確認',
        usage: '(レベルを確認するユーザー)',

        owneronly: false,
        adminonly: false,
        category: 'Level',
    },

    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('自分のLevel確認')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('レベルを確認するユーザー')
                .setRequired(false);
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const user = interaction.options.getUser('user', false);

            if (user) {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(user.id);
                if (!userleveldata) {
                    userleveldata = { id: `${user.id}`, user: user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rankimage = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(user.id);
                if (rankimage) {
                    const rank = new Rank()
                        .setAvatar(user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/${user.id}.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(user.username)
                        .setProgressBar(rankimage.barcolor);


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')],
                    });
                }
                else {
                    const rank = new Rank()
                        .setAvatar(user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', './dat/images/default.png')
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(user.username)
                        .setProgressBar('#ffffff');


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')],
                    });
                }
            }
            else {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(interaction.user.id);
                if (!userleveldata) {
                    userleveldata = { id: `${interaction.user.id}`, user: interaction.user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rankimage = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(interaction.user.id);
                if (rankimage) {
                    const rank = new Rank()
                        .setAvatar(interaction.user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/${interaction.user.id}.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(interaction.user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(interaction.user.username)
                        .setProgressBar(rankimage.barcolor);


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')],
                    });
                }
                else {
                    const rank = new Rank()
                        .setAvatar(interaction.user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', './dat/images/default.png')
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(interaction.user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(interaction.user.username)
                        .setProgressBar('#ffffff');


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')],
                    });
                }
            }
        }
 catch (error) {
            errorlog(client, interaction, error);
        }
    },
};