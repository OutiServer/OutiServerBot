const { Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "levels",
        description: "おうちlevelランキング",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const all = client.db.prepare("SELECT * FROM levels ORDER BY allxp DESC;").all();
            const embeds = [];
            let ranknumber1 = 1;
            let ranknumber2 = 10;
            let rank = 1;
            const bans = await message.guild.bans.fetch();

            for (let i = 0; i < Math.ceil(all.length / 10); i++) {
                embeds.push(
                    new MessageEmbed()
                        .setTitle(`おうち鯖Levelランキング${ranknumber1}〜${ranknumber2}位`)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                ranknumber1 += 10;
                ranknumber2 += 10;
            }

            for (const data of all) {
                let user = client.users.cache.get(data.user);
                if (!user) {
                    user = (await client.users.fetch(data.user)).tag;
                }

                if (bans.get(data.user)) {
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:banned:852517393636917258>`, `${data.level}Level ${data.xp}経験値`);
                }
                else if (message.guild.members.cache.get(user.id)) {
                    if (message.guild.members.cache.get(user.id).roles.cache.has('739473593674629120')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:boost:855244574430461972>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else if (message.guild.members.cache.get(user.id).roles.cache.has('780381600751812638')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:DeadCrew:852517409331609610>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag}`, `${data.level}Level ${data.xp}経験値`);
                    }
                }
                else {
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag}`, `${data.level}Level ${data.xp}経験値`);
                }

                rank++;
            }

            let select = 0;
            const buttons = new MessageActionRow()
                .addComponents(
                    [
                        new MessageButton()
                            .setCustomId('left')
                            .setLabel('◀️')
                            .setStyle('PRIMARY')
                            .setDisabled(),
                        new MessageButton()
                            .setCustomId('right')
                            .setLabel('▶️')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId('stop')
                            .setLabel('⏹️')
                            .setStyle('DANGER')
                    ]
                );
            const msg = await message.reply({
                embeds: [embeds[0]],
                components: [buttons],
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
            const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON' });
            collector.on('collect', async interaction => {
                if (interaction.user.id !== message.author.id) return;
                if (interaction.customId === 'left') {
                    select--;
                    buttons.components[1].setDisabled(false);
                    if (select < 1) {
                        buttons.components[0].setDisabled();
                    }
                    await msg.edit(
                        {
                            embeds: [embeds[select]],
                            components: [buttons]
                        }
                    );
                }
                else if (interaction.customId === 'right') {
                    select++;
                    buttons.components[0].setDisabled(false);
                    if (select >= embeds.length - 1) {
                        buttons.components[1].setDisabled();
                    }
                    await msg.edit(
                        {
                            embeds: [embeds[select]],
                            components: [buttons]
                        }
                    );
                }
                else if (interaction.customId === 'stop') {
                    buttons.components[0].setDisabled();
                    buttons.components[1].setDisabled();
                    buttons.components[2].setDisabled();
                    await msg.edit(
                        {
                            embeds: [embeds[select]],
                            components: [buttons]
                        }
                    );
                    collector.stop();
                }
            });
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}