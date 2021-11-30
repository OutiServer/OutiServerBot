const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction, InteractionCollector } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'levels',
        description: 'おうち鯖levelランキング',
        usage: '',

        owneronly: false,
        adminonly: false,
        category: 'Level',
    },

    data: new SlashCommandBuilder()
        .setName('levels')
        .setDescription('おうち鯖levelランキング'),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const all = client.db.prepare('SELECT * FROM levels ORDER BY allxp DESC;').all();
            const embeds = [];
            let ranknumber1 = 1;
            let ranknumber2 = 10;
            let rank = 1;
            const bans = await interaction.guild.bans.fetch();

            for (let i = 0; i < Math.ceil(all.length / 10); i++) {
                embeds.push(
                    new MessageEmbed()
                        .setTitle(`おうち鯖Levelランキング${ranknumber1}〜${ranknumber2}位`)
                        .setColor('RANDOM')
                        .setTimestamp(),
                );
                ranknumber1 += 10;
                ranknumber2 += 10;
            }

            for (const data of all) {
                let user = client.users.cache.get(data.user);
                if (!user) {
                    user = (await client.users.fetch(data.user));
                }

                if (bans.get(data.user)) {
                    embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:banned:877630159853862943>`, `${data.level}Level ${data.xp}経験値`);
                }
                else if (interaction.guild.members.cache.get(user.id)) {
                    if (interaction.guild.members.cache.get(user.id).roles.cache.has('739473593674629120')) {
                        embeds[Math.ceil(rank / 10) - 1].addField(`${rank}位: ${user.tag} <:boost:877630159501533224>`, `${data.level}Level ${data.xp}経験値`);
                    }
                    else if (interaction.guild.members.cache.get(user.id).roles.cache.has('780381600751812638')) {
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
                            .setStyle('DANGER'),
                    ],
                );

            const msg = await interaction.followUp(
                {
                    embeds: [embeds[0]],
                    components: [
                        buttons,
                    ],
                    fetchReply: true,
                },
            );

            const filter = (i) => i.user.id === interaction.user.id;
            const collector = new InteractionCollector(client, { filter: filter, componentType: 'BUTTON', message: msg });
            collector.on('collect', async i => {
                if (i.customId === 'left') {
                    select--;
                    buttons.components[1].setDisabled(false);
                    if (select < 1) {
                        buttons.components[0].setDisabled();
                    }
                    await i.update(
                        {
                            embeds: [embeds[select]],
                            components: [buttons],
                        },
                    );
                }
                else if (i.customId === 'right') {
                    select++;
                    buttons.components[0].setDisabled(false);
                    if (select >= embeds.length - 1) {
                        buttons.components[1].setDisabled();
                    }
                    await i.update(
                        {
                            embeds: [embeds[select]],
                            components: [buttons],
                        },
                    );
                }
                else if (i.customId === 'stop') {
                    buttons.components[0].setDisabled();
                    buttons.components[1].setDisabled();
                    buttons.components[2].setDisabled();
                    await i.update(
                        {
                            embeds: [embeds[select]],
                            components: [buttons],
                        },
                    );
                    collector.stop();
                }
            });
        }
 catch (error) {
            errorlog(client, interaction, error);
        }
    },
};