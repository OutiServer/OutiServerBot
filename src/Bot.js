const { Client, Intents, Collection } = require('discord.js');
const { getLogger, configure } = require('log4js');
const Database = require('./database/Database');

class Bot extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
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

        this.database = new Database();

        /**
         * @type {import('discord.js').Collection<string, import('./utils/SpearkClient')>}
         */
        this.speakers = new Collection();

        this.study_times = new Collection();

        this.logger = getLogger('OutiServerBot');
    }
}

module.exports = Bot;