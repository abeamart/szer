const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  deleted: true,
  data: new SlashCommandBuilder()
    .setName('ustaw-nazwę')
    .setDescription('Pong!'),

  run: ({ interaction, client, handler }) => {
    
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
