const archiwuj = require('../models/archiwuj')

const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('archiwuj')
    .setDescription('używane w kanałach przeznaczonych do archiwacji informacji')
    .addStringOption((option) => option.setName('data').setDescription("określ datę archiwacji (rok-miesiąc-dzień, np:2024-02-02)"))
    .addStringOption((option) => option.setName('opis').setDescription("opisz wydarzenie do archiwizacji"))
    .addStringOption((option) => option.setName('typ').setDescription("typ wydarzenia do archiwizacji")),

  run: async ({ interaction, client, handler }) => {

    archiwuj(interaction,interaction.channel,interaction.options.getString('opis'),interaction.options.getString('typ'),interaction.options.getString('data'))

    
  },
};
