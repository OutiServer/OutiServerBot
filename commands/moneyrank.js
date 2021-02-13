const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionController } = require('discord.js-reaction-controller');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

module.exports = {
    info: {
      name: "moneyrank",
      description: "うんコイン所持金ランキング",
      usage: "",
      aliases: ["mr"],
      botownercommand: false,
      botadmincommand: false
    }, 
/**
 * @param {Client} client
 * @param {Message} message
 */
    run: async function(client, message, args) {
      let rank = 1
      let embed = {};
      let embednumber = 0;
      let args1 = 1;
      while(embednumber < 10){
        embed[embednumber] = new MessageEmbed()
        .setTitle(`うんこ鯖所持金ランキング${args1}〜${embednumber + 10}位`)
        .setFooter(`コマンド実行者 ${message.author.tag}`, message.author.avatarURL())
        .setColor('RANDOM')
        .setTimestamp();
        embednumber++;
        args1 += 10;
      }
      const top100 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all(message.guild.id);
      for(const data of top100){
        const user = message.guild.member(data.user);
        let usertag = ''
        if(!user){
          usertag = '取得できないユーザー';
        }
        else{
          usertag = user.user.tag;
        }
        embednumber = Math.ceil( rank / 10 ) - 1;
        embed[embednumber].addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        rank++;
      }
     const controller = new ReactionController(client);
     controller
     .addPages([
       embed[0],
       embed[1],
       embed[2],
       embed[3],
       embed[4],
       embed[5],
       embed[6],
       embed[7],
       embed[8],
       embed[9],
     ])
   controller.send(message)
     .catch(console.error)
    },
};