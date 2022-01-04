const { Client, Intents, Collection } = require('discord.js');
const SQLite = require('better-sqlite3');
const Twitter = require('twitter');

class Bot extends Client {

    /**
     * @param {string} dbname
     */

    constructor(dbname) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            ],
            partials: [
                'MESSAGE',
                'REACTION',
            ],
            allowedMentions: {
                parse: [
                    'users',
                ],
                repliedUser: false,
            },
        });

        /**
         * @type {import('discord.js').Collection<string, { info: { name: string, description: string, usage: string, owneronly: boolean, adminonly: boolean, category: string }, data: SlashCommandBuilder, run: function(Client, Message, string[]): Promise<Message> }}
         */
        this.commands = new Collection();

        this.db = new SQLite(dbname);

        /**
         * @type {import('@discordjs/voice').VoiceConnection | null}
         */

        this.connection = null;

        /**
         * @type {{ channel: string[], message: string[], flag: boolean }}
         */

        this.speekqueue = {};

        /**
         * @type {import('twitter')}
         */
        this.twitter = new Twitter({
            consumer_key: process.env.TWITTER_KET,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET,
        });
    }
}

module.exports = Bot;