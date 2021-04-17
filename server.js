const { Client } = require('discord.js');
const express = require("express");
const fetch = require('node-fetch');
const path = require('path');
const util = require('minecraft-server-util');
const { clienterrorlog } = require('./functions/error');
const app = express();

module.exports = {

    /**
     * @param {Client} client
     */

    run: async function (client) {
        try {
            app.use(express.static(path.join(__dirname, 'public')));
            app.set("view engine", "ejs");

            app.listen(process.env.PORT, () => {
                console.log(`サーバーを起動させました！`);
            });

            app.get("/", (req, res) => {
                if (req.query.code) {
                    const accessCode = req.query.code;
                    const data = {
                        client_id: '777198236472836147',
                        client_secret: 'km8wlHOqf_WuL2WvsEibm2tsOk-BjcS8',
                        grant_type: 'authorization_code',
                        redirect_uri: 'https://unkoserverbot.glitch.me',
                        code: accessCode,
                        scope: ['identify', 'guilds'],
                    };

                    fetch('https://discord.com/api/oauth2/token', {
                        method: 'POST',
                        body: new URLSearchParams(data),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                        .then(discordRes => discordRes.json())
                        .then(info => {
                            return info;
                        })
                        .then(info => fetch('https://discord.com/api/users/@me', {
                            headers: {
                                authorization: `${info.token_type} ${info.access_token}`,
                            },
                        }))
                        .then(userRes => userRes.json())
                        .then(userdata => {
                            const user = userdata.username + '#' + userdata.discriminator;
                            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                                .then((result) => {
                                    res.render(__dirname + '/public/html/loginserverok.ejs', { username: user });
                                })
                                .catch(() => {
                                    res.render(__dirname + '/public/html/loginserverok.ejs', { username: user });
                                });
                        });
                }
                else {
                    util.statusBedrock('126.235.33.140', { timeout: 5000 })
                        .then((result) => {
                            res.render(__dirname + '/public/html/index.ejs', { joindedmembers: `${result.onlinePlayers}.${result.maxPlayers}`, serverversion: result.version });
                        })
                        .catch(() => {
                            res.sendFile(__dirname + '/public/html/index.html');
                        });
                }
            });
        } catch (error) {
            clienterrorlog(client, error);
        }
    }
};