const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    info: {
        name: "teams",
        description: "国メンバー表示",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        const homeserver = client.guilds.cache.get('706452606918066237');
        const okeihan = homeserver.roles.cache.get('827888356553654313');
        const sum = homeserver.roles.cache.get('827888505408847882');
        const syowatan = homeserver.roles.cache.get('827888677421187092');
        const seaside = homeserver.roles.cache.get('827916187790475306');
        const samehada = homeserver.roles.cache.get('828059763802636289');
        const NewCountry = homeserver.roles.cache.get('828098224828186644');
        const nesutonia = homeserver.roles.cache.get('828486972972466236');
        let embeds = [];

        embeds.push(
            new MessageEmbed()
                .setTitle(okeihan.name)
                .setDescription(`メンバー数: ${okeihan.members.size}\n\nメンバー:\n${okeihan.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(sum.name)
                .setDescription(`メンバー数: ${sum.members.size}\n\nメンバー:\n${sum.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(syowatan.name)
                .setDescription(`メンバー数: ${syowatan.members.size}\n\nメンバー:\n${syowatan.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(seaside.name)
                .setDescription(`メンバー数: ${seaside.members.size}\n\nメンバー:\n${seaside.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(samehada.name)
                .setDescription(`メンバー数: ${samehada.members.size}\n\nメンバー:\n${samehada.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(NewCountry.name)
                .setDescription(`メンバー数: ${NewCountry.members.size}\n\nメンバー:\n${NewCountry.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );
        embeds.push(
            new MessageEmbed()
                .setTitle(nesutonia.name)
                .setDescription(`メンバー数: ${nesutonia.members.size}\n\nメンバー:\n${nesutonia.members.map(user => user.user.tag).join('\n')}`)
                .setColor('RANDOM')
                .setTimestamp()
        );

        const msg = await message.channel.send('```' + `1/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[0]);
        while (true) {
            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
            const response = collected.first();
            if (!response) {
                msg.edit('');
                break;
            }
            else if (response.content === '0') {
                response.delete();
                msg.edit('');
                break;
            }
            else {
                const selectembed = Number(response.content);
                if (selectembed > 0 && selectembed < embeds.length + 1) {
                    response.delete();
                    msg.edit('```' + `${selectembed}/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[selectembed - 1]);
                }
            }
        }

        client.cooldown.set(message.author.id, false);
    }
}