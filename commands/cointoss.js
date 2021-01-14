const { Client, Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');

module.exports = {
    info: {
        name: "cointoss",
        description: "コイントス",
        usage: "[賭け金]",
        aliases: ["ct"],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
        if(message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.delete();
            const reply = await message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
            reply.delete({ timeout: 5000 });
            return;
        }
        let userdebtdata = client.getDebt.get(message.author.id, message.guild.id);
        if (!userdebtdata) {
          userdebtdata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, Tuna: 0, Shoulder: null }
        }
        client.setDebt.run(userdebtdata);
        if(userdebtdata.Tuna === 1) return message.reply('借金返済中にコイントスはできません');
        const Stake = Number(args[0]);
        if(!Stake || Stake < 20000 || Stake > 100000) return message.reply('第一引数に賭け金を20000から100000の数値で入れてください！');
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
            usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0 }
        } 
        let usercointosssettingsdata = client.getCointosssettings.get(message.author.id, message.guild.id);
        if (!usercointosssettingsdata) {
            usercointosssettingsdata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, magnification: 2, dividend: 2 }
        } 
        let cointossMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: new MessageEmbed()
                .setDescription(`コイントスを行います 表・裏、どちらかをリアクションしてください\n表: <:swordthonk:798179606166634516>\n裏: <:swordthinkblue:798179591582908446>`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '798179606166634516': 'front',
                    '798179591582908446': 'back'
                }
            },
            {
                name: 'front',
                content: new MessageEmbed()
                .setDescription(`表を選択した！`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'back',
                content: new MessageEmbed()
                .setDescription(`裏を選択した！`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            }
        ], 60000)
        cointossMenu.start()
        cointossMenu.on('pageChange', async destination => {
          let coin = Math.ceil( Math.random() * usercointosssettingsdata.magnification);
          let Win = Stake * usercointosssettingsdata.dividend;
          let Lose = Stake * 4;
          const embed = new MessageEmbed()
          .setTitle('コイントスの結果')
          .setColor('RAMDOM')
          .setTimestamp();
          if (destination.name === "front") {
              if(coin === 1){
                  usermoneydata.money += Win;
                  usercointosssettingsdata.dividend += 2;
                  usercointosssettingsdata.magnification = usercointosssettingsdata.magnification * 2;
                  embed.setDescription(`表 <:swordthonk:798179606166634516> 当たり！\n${Win}うんコイン獲得！`);
             }
             else{
                usermoneydata.money -= Lose;
                usercointosssettingsdata.dividend  = 2;
                usercointosssettingsdata.magnification = 2;
                embed.setDescription(`裏 <:swordthinkblue:798179591582908446> ハズレ\n${Lose}うんコイン消失！`);
             }
          }
          else if (destination.name === "back") {
            if(coin === 1){
                usermoneydata.money += Win;
                usercointosssettingsdata.dividend += 2;
                usercointosssettingsdata.magnification = usercointosssettingsdata.magnification * 2;
                embed.setDescription(`裏 <:swordthinkblue:798179591582908446> 当たり！\n${Win}うんコイン獲得！`);
            }
            else{
                usermoneydata.money -= Lose;
                usercointosssettingsdata.dividend  = 2;
                usercointosssettingsdata.magnification = 2;
              embed.setDescription(`表 <:swordthonk:798179606166634516> ハズレ\n${Lose}うんコイン消失！`);
            }
        　 }
        message.channel.send(embed);
        client.setMoney.run(usermoneydata);
        client.setCointosssettings.run(usercointosssettingsdata);
        })
    }, 
};