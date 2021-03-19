const { Client } = require('discord.js');
const cron = require('node-cron');
const { Database } = require('./index');
const db = new Database('unkoserver.db');

module.exports = {

    /**
     * @param {Client} client
     */

    run: async function (client) {
        const disboarddata = db.DisboardtimerGet('706452606918066237');
        cron.schedule(`${disboarddata.second} ${disboarddata.minute} ${disboarddata.hour} * * *`, () => {
            client.channels.cache.get('706452606918066237').send('Bumpしてから二時間経ちました\n`!d bump` を実行しましょう<:emoji_121:820198227147751474>')
        });

        const dissokudata = db.DissokutimerGet('706452606918066237');
        cron.schedule(`${dissokudata.second} ${dissokudata.minute} ${dissokudata.hour} * * *`, () => {
            client.channels.cache.get('706452606918066237').send('Upしてから一時間経ちました\n`/dissoku up!` を実行しましょう<:emoji_121:820198227147751474>')
        });
    }
}