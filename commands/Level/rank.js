const { MessageAttachment, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Rank } = require("canvacord");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "rank",
        description: "MyrankとLevel確認",
        usage: "[ユーザー]",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('MyrankとLevel確認')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('レベルを確認するユーザー')
                .setRequired(false)
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
                        .setProgressBar(rankimage.barcolor)


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')]
                    });
                }
                else {
                    const rank = new Rank()
                        .setAvatar(user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/default.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(user.username)
                        .setProgressBar('#ffffff');


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')]
                    });
                }
            }
            else {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
                if (!userleveldata) {
                    userleveldata = { id: `${message.author.id}`, user: message.author.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rankimage = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id);
                if (rankimage) {
                    const rank = new Rank()
                        .setAvatar(message.author.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/${message.author.id}.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(message.author.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(message.author.username)
                        .setProgressBar(rankimage.barcolor)


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')]
                    });
                }
                else {
                    const rank = new Rank()
                        .setAvatar(message.author.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/default.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(message.author.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setUsername(message.author.username)
                        .setProgressBar('#ffffff');


                    const data = await rank.build();
                    await interaction.followUp({
                        files: [new MessageAttachment(data, 'rank.png')]
                    });
                }
            }
        } catch (error) {
            errorlog(interaction, error);
        }
    }
};