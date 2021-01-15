const { Client, Message, MessageEmbed } = require('discord.js');

let alldata = [];

module.exports = {
    info: {
        name: "entry",
        description: "競馬エントリーコマンド",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
        const user = message.author.id;
        let keibasettingsdata = client.getKeibasettings.get(message.guild.id);
        if (!keibasettingsdata) {
            keibasettingsdata　= { id: `${message.guild.id}`, guild: message.guild.id, horselength: 0, horseentry: 0, participant: null }
        }
        if(keibasettingsdata.horseentry === 1) return message.reply('競馬のエントリーは既に締め切ってます！');
        let keibahorsedata = client.getKeibahorse.get(message.author.id, message.guild.id);
        if (!keibahorsedata) {
            keibahorsedata　= { id: `${message.guild.id}-${message.author.id}`, user: user, guild: message.guild.id, name: null, image: null, number: 0 }
        }
        if(keibahorsedata.number !== 0) return message.reply('あなたは既に馬をエントリー済みです！');
        const name = args[0];
        const image = message.attachments.map(attachment => attachment.url).join(' ');
        if(!name) return message.reply('馬の名前を第一引数に入れてください！');
        if(!image) return message.reply('馬の画像を送信してください！');
        keibahorsedata.name = name;
        keibahorsedata.image = image;
        keibasettingsdata.horselength++;
        keibahorsedata.number = keibasettingsdata.horselength;
        keibasettingsdata.participant += user+'\n'
        if(keibasettingsdata.horselength > 7){
            keibasettingsdata.horseentry = 1;
        }
        client.setKeibahorse.run(keibahorsedata);
        client.setKeibasettings.run(keibasettingsdata);
        client.channels.cache.get('799262931354124328').send(
            new MessageEmbed()
            .setTitle('新しい馬のエントリーです！')
            .setDescription(`馬の名前: ${name}\nエントリーした人: <@${user}>`)
            .setImage(image)
            .setColor('RANDOM')
            .setTimestamp()
        );
    },
};