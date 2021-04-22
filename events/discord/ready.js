const { Client } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');
const { Database } = require('../../home/index');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    const db = new Database('unkoserver.db');
    db.Initialize();

    client.guilds.cache.get('706452606918066237').fetchInvites()
      .then(invites => {
        client.invites = invites;
      })

    client.user.setPresence({ activity: { name: '再起動しました', type: 'PLAYING' }, status: 'dnd' })
      .then(console.log());
    console.log(`Logged in as ${client.user.tag}`);
    client.channels.cache.get('706452607538954263').send('じゃあの。😉');

    client.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;
      const cmd = client.slashcommands.get(command);
      cmd.run(client, interaction, args);
    });

    require('../../handleReaction').run(client);
    require('../../server').run(client);
    require('../../websocket').run(client);
  } catch (error) {
    clienterrorlog(client, error);
  }
};