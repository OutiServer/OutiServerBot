const { Client } = require('discord.js');
const express = require("express");
const path = require('path');
const util = require('minecraft-server-util');
const app = express();

/**
 * @param {Client} client
 */

module.exports = {
    run: async function (client) {
        app.use(express.static(path.join(__dirname, 'public')));
        app.set("view engine", "ejs");

        app.listen(process.env.PORT, () => {
            console.log(`サーバーを起動させました！`);
        });

        app.get("/", (req, res) => {
            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                .then((result) => {
                    res.render(__dirname + '/public/html/index.ejs', { joindedmembers: `${result.onlinePlayers}.${result.maxPlayers}`, serverversion: result.version });
                })
                .catch(() => {
                    res.sendFile(__dirname + '/public/html/index.html');
                })
        });
    }
};