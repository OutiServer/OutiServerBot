const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { getLogger, configure } = require('log4js');
const Database = require('./database/Database');
const { DiscordTogether } = require('discord-together');

class Bot extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.Message,
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
         * @type {import('discord.js').Collection<string, { info: { name: string, description: string, usage: string, category: string, deferReply: boolean }, data: import('@discordjs/builders').SlashCommandBuilder, run: function(Bot, import('discord.js').CommandInteraction, string[]): Promise<void> }}
         */
        this.commands = new Collection();

        this.database = new Database();

        /**
         * @type {import('discord.js').Collection<string, import('./utils/SpearkClient')>}
         */
        this.speakers = new Collection();

        this.study_times = new Collection();

        this.logger = getLogger('OutiServerBot');

        this.discordTogether = new DiscordTogether(this);
    }
}

module.exports = Bot;