const { Client, Intents, Collection } = require('discord.js');
const SQLite = require('better-sqlite3');
const Twitter = require('twitter');
const { getLogger, configure } = require('log4js');

class Bot extends Client {
    constructor() {
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

        configure({
            appenders: {
                out: { type: 'stdout', layout: { type: 'coloured' } },
                app: { type: 'file', filename: 'logs/outiserverbot.log', pattern: 'yyyy-MM-dd.log' },
            },
            categories: {
                default: { appenders: ['out', 'app'], level: 'all' },
            },
        });

        /**
         * @type {import('discord.js').Collection<string, { info: { name: string, description: string, usage: string, category: string }, data: import('@discordjs/builders').SlashCommandBuilder, run: function(Bot, import('discord.js').CommandInteraction, string[]): Promise<void> }}
         */
        this.commands = new Collection();

        this.db = new SQLite('outiserver.db');

        /**
         * @type {import('twitter')}
         */
        this.twitter = new Twitter({
            consumer_key: process.env.TWITTER_KET,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET,
        });

        /**
         * @type {import('discord.js').Collection<string, import('./utils/SpearkClient')>}
         */
        this.speakers = new Collection();

        this.study_times = new Collection();

        this.logger = getLogger('OutiServerBot');
    }
}

module.exports = Bot;