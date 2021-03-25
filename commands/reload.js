const fs = require("fs");
const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "reload",
        description: "コマンドファイルのリロード",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {Client} client 
     * @param {Message} message
     */

    run: async function (client, message, args) {
        message.channel.send('コマンドファイルのリロードを開始しました');
        client.commands.clear();

        fs.readdir("./commands/", (err, files) => {
            if (err) return console.error(err);
            files.forEach((file) => {
                if (!file.endsWith(".js")) return;
                let props = require(`./commands/${file}`);
                let commandName = file.split(".")[0];
                client.commands.set(commandName, props);
                console.log("コマンドファイルのリロード完了: " + commandName);
                message.channel.send(`Command file ${commandName} Loading completed`);
            });
        });
    }
}