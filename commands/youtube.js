const { Message, MessageEmbed } = require('discord.js');
const yts = require('yt-search');

module.exports = {
  info: {
    name: "youtube",
    description: "YouTubeで検索",
    usage: "[検索する単語]",
    aliases: ["y"],
    botownercommand: false,
    botadmincommand: false
  },
/**
 * @param {Message} message
 */
  run: async function (client, message, args) {
    const AKB = message.content.split(" ").slice(1).join(" ");
        if (!AKB){
            message.react('793460058250805259');
            return message.reply('第一引数にYouTube上で検索する単語を入れてください');
        }
        yts( AKB, function ( err, r ) {
        const videos = r.videos;
        let youtubes = ``;
        let rank = 1;
        for(const data of videos){
            youtubes += `${rank} [${data.title}](https://youtu.be/${data.videoId})\n\n`;
            rank++;
        }
        message.channel.send(
            new MessageEmbed()
            .setDescription(youtubes)
            .setColor('RANDOM')
            .setTimestamp()
        );
        })
  },
};