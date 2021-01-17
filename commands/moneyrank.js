const { Client, Message } = require('discord.js');
const { ReactionController } = require('discord.js-reaction-controller');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');
const moneysembeds = require('../class/moneysembeds');

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
      embed[0] = new moneysembeds(message, '1', '10');
      embed[1] = new moneysembeds(message, '11', '20');
      embed[2] = new moneysembeds(message, '21', '30');
      embed[3] = new moneysembeds(message, '31', '40');
      embed[4] = new moneysembeds(message, '41', '50');
      const top50 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 50;").all(message.guild.id);
      for(const data of top50){
        const user = message.guild.member(data.user);
        let usertag = ''
        if(!user){
          usertag = '取得できないユーザー';
        }
        else{
          usertag = user.user.tag;
        }
        if(rank < 11){
          embed[0].embeds.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        }
        else if(rank < 21){
          embed[1].embeds.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        }
        else if(rank < 31){
          embed[2].embeds.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        }
        else if(rank < 41){
          embed[3].embeds.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        }
        else if(rank < 51){
          embed[4].embeds.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        }
        rank++;
      }
     const controller = new ReactionController(client);
     controller
     .addPages([
       embed[0].embeds,
       embed[1].embeds,
       embed[2].embeds,
       embed[3].embeds,
       embed[4].embeds
     ])
   controller.send(message)
     .catch(console.error)
    },
};