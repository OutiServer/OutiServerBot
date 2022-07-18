const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { slotGui, resultCheck } = require('../../utils/slotUtil');
const { setTimeout } = require('timers/promises');

module.exports = {
    info: {
        name: 'slot',
        description: 'スロットをやる',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('slot')
        .setDescription('スロットをやる')
        .addIntegerOption(option => option
            .setName('roll')
            .setDescription('回転数')
            .setRequired(true),
        ),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const slotData = client.database.getSlot(interaction.channelId);
        if (!slotData) return await interaction.followUp('このチャンネルはスロットチャンネルではありません');
        let ver = 1;
        let be = 3;

        if (slotData.type === 1) {
            ver = 3;
            be = 3;
        }
        else if (slotData.type === 2) {
            ver = 3;
            be = 5;
        }


        const roll = interaction.options.getInteger('roll', true);

        await interaction.followUp(`スロットを${roll}回回します`);

        for (let i = 0; i < roll; i++) {
            const msg = await interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('スロットを回しています...')
                        .setDescription(slotGui(ver, be).text),

                ],
            });

            await setTimeout(500);
            await msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('スロットを回しています...')
                        .setDescription(slotGui(ver, be).text),

                ],
            });

            await setTimeout(1000);
            await msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('スロットを回しています...')
                        .setDescription(slotGui(ver, be).text),

                ],
            });

            await setTimeout(2000);
            const result = slotGui(ver, be);
            await msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('スロットを回しています...')
                        .setDescription(result.text),

                ],
            });

            await setTimeout(1000);
            await msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`スロット結果\n${resultCheck(result, ver, be)}ライン当たり`)
                        .setDescription(result.text),

                ],
            });

        }
    },
};