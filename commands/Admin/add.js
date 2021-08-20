const { CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "add",
        description: "ユーザーに経験値追加",
        usage: "[ユーザーをメンションまたはID] [付与する経験値]",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('ユーザーに経験値追加')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('経験値を追加するユーザー')
                .setRequired(true)
        })
        .addIntegerOption(option => {
            return option.setName('xp')
                .setDescription('付与する経験値')
                .setRequired(true)
        }),

    /**
     * @param {bot} client 
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const user = interaction.options.getUser('user');
            const addxp = interaction.options.getInteger('xp');

            let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(user.id);
            if (!userleveldata) {
                userleveldata = { id: `${user.id}`, user: user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
            }

            userleveldata.xp += addxp;
            userleveldata.allxp += addxp;

            while (userleveldata.xp >= userleveldata.level * 55) {
                userleveldata.xp -= userleveldata.level * 55;
                userleveldata.level++;
            }

            client.db.prepare('UPDATE levels SET level = ?, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);
            await interaction.followUp(`${user}に${addxp}経験値付与しました`);
        } catch (error) {
            errorlog(interaction, error);
        }
    }
}