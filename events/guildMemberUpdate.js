const { Client, GuildMember, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  if(oldMember.guild.id !== '706452606918066237') return;
  let Trust = 50;
  if(!oldMember.roles.cache.has('794803787159568424') && newMember.roles.cache.has('794803787159568424')){
    Trust = 100;
  }
  else if(!oldMember.roles.cache.has('794803787516346408') && newMember.roles.cache.has('794803787516346408')){
    Trust = 90;
  }
  else if(!oldMember.roles.cache.has('794803787466145814') && newMember.roles.cache.has('794803787466145814')){
    Trust = 80;
  }
  else if(!oldMember.roles.cache.has('794803788036177931') && newMember.roles.cache.has('794803788036177931')){
    Trust = 70;
  }
  else if(!oldMember.roles.cache.has('794803788661391370') && newMember.roles.cache.has('794803788661391370')){
    Trust = 60;
  }
  else if(!oldMember.roles.cache.has('794803789538394142') && newMember.roles.cache.has('794803789538394142')){
    Trust = 50;
  }
  else if(!oldMember.roles.cache.has('794803789881540621') && newMember.roles.cache.has('794803789881540621')){
    Trust = 40;
  }
  else if(!oldMember.roles.cache.has('794803789932134411') && newMember.roles.cache.has('794803789932134411')){
    Trust = 30;
  }
  else if(!oldMember.roles.cache.has('794803790477131787') && newMember.roles.cache.has('794803790477131787')){
    Trust = 20;
  }
  else if(!oldMember.roles.cache.has('794803790581596162') && newMember.roles.cache.has('794803790581596162')){
    Trust = 10;
  }
  else if(!oldMember.roles.cache.has('794806814909661255') && newMember.roles.cache.has('794806814909661255')){
    Trust = 0;
  }
  else if(!oldMember.roles.cache.has('795891996656402482') && newMember.roles.cache.has('795891996656402482')){
    Trust = -100;
  }
  else if(!oldMember.roles.cache.has('800265733523243028') && newMember.roles.cache.has('800265733523243028')){
    Trust = -100000000000000000000000000000000000000000000000000000000000000000000000;
  }
  else{
    return;
  }
  oldMember.send(
    new MessageEmbed()
    .setDescription(`あなたの信頼度は${Trust}に変更されました`)
    .setColor('RANDOM')
    .setTimestamp()
  );
};