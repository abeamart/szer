const setnickname = require('../models/setnickname')
const dbdata = require('../models/dbdata')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zmień-nick')
    .setDescription('zmień czyiś nick')
    .addStringOption(option =>
      option.setName('nowy-nick')
        .setDescription('wpisz pożądany nick').setRequired(true))
    .addUserOption(option =>
      option.setName('dla-kogo')
        .setDescription('użytkownik, którego nick chcesz zmienić')),

  run: async ({ interaction, client, handler }) => {

    const newnick = interaction.options.getString('nowy-nick')
    const useroption = interaction.options.getUser('dla-kogo')
    let member = interaction.member

    if (useroption !== null && interaction.member.id !== useroption.id) {
      member = useroption
    }


    const dbmember = await dbdata.findOneAndUpdate({ Id: member.id },
      { $set: { [`info.desirednick`]: newnick } })
    setnickname(interaction, member)
    interaction.reply(`zmieniono nick użytkownika ${member} na "${newnick}"`)
  },
};
