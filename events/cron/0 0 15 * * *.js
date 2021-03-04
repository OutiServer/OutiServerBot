const { Client, MessageAttachment, WebhookClient } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    const time = new Date();
    sql.backup(`../../${time}.db`)
        .then(() => {
            client.channels.cache.get('816555488694108170').send(new MessageAttachment(`${time}.db`));
        });
    sql.prepare("DROP TABLE dailys;").run();
    const testtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
    if (!testtable['count(*)']) {
        sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    let servermoneydata = client.getServerMoney.get('706452606918066237');
    const all = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all('706452606918066237');
    for (let data of all) {
        if (data.money > 1) {
            const zeikin = Math.ceil(data.money / 1.15);
            data.money -= zeikin;
            servermoneydata.money += zeikin;
            client.setMoney.run(data);
        }
        else if (data.money < 0) {
            let userdebtdata = client.getDebt.get(data.user, '706452606918066237');
            if (!userdebtdata) {
                userdebtdata = { id: `706452606918066237-${data.user}`, user: data.user, guild: '706452606918066237', Tuna: 0, Shoulder: null }
            }
            if (userdebtdata.Tuna === 0) {
                client.guilds.cache.get('706452606918066237').member(data.user).roles.add('798570033235755029');
                userdebtdata.Tuna = 1;
                const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
                webhook.send(`<@${data.user}>、開けろごらああ！てめえ自分が何シてんのかわかってるのか！！？\n${usermoneydata.money * -1}円、しっかり払ってもらうで`);
            }

            client.setDebt.run(userdebtdata);
        }
    }
    client.setServerMoney.run(servermoneydata);
};