const { Client, Intents, Collection, Message, Invite } = require('discord.js');
const SQLite = require("better-sqlite3");

module.exports = class extends Client {

    /**
     * @param {string} dbname 
     */

    constructor(dbname) {
        super({ ws: { intents: Intents.ALL } });
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

        /**
         * @type {Collection<string, Invite>}
         */
        this.invites = new Collection();
        this.db = new SQLite(dbname);
    }
}