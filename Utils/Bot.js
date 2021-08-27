const { Client, Intents, Collection, Message } = require('discord.js');
const { VoiceConnection } = require('@discordjs/voice');
const SQLite = require("better-sqlite3");
const Twitter = require('twitter');

class Bot extends Client {

    /**
     * @param {string} dbname 
     */

    constructor(dbname) {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
            partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER'],
            allowedMentions: {
                parse: ['users'],
                repliedUser: false
            }
        });

        /**
         * @type {Collection <string, { info: { name: string, description: string, usage: string, aliases: string[], owneronly: boolean, adminonly: boolean, category: string }, run: function(Client, Message, string[]): Promise<Message> }}
         */
        this.commands = new Collection();

        /**
         * @type {Collection<string, boolean>}
         */
        this.cooldown = new Collection();

        /**
         * @type {Collection<string, boolean>}
         */
        this.levelcooldown = new Collection();

        this.db = new SQLite(dbname);

        /**
         * @type {VoiceConnection | null}
         */

        this.connection = null;

        /**
         * @type {{ channel: string[], message: string[], flag: boolean }}
         */

        this.speekqueue = {};

        this.twitter = new Twitter({
            consumer_key: process.env.TWITTER_KET,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
        });
    }
}

module.exports = Bot;