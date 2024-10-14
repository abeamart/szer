const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  deleted: true,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong!'),

  run: ({ interaction, client, handler }) => {
    
    interaction.reply(`pong! ${client.ws.ping}ms`);
  },
};
