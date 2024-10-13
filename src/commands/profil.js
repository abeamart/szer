const dbdata = require('../models/dbdata')

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profil')
    .setDescription('załącza informacje o profilu danej osoby')
    .addUserOption((option) => option.setName('użytkownik').setDescription("określ użytkownika, którego profil chcesz sprawdzić").setRequired(true)),

  run: async ({ interaction, client, handler }) => {

    const user = interaction.options.getUser('użytkownik')
    const dbuser = await dbdata.findOne({ Id: user.id })

    const info = [dbuser.info.name, dbuser.info.desirednick, dbuser.info.surname, dbuser.info.grade].map(x => {if(!x) {return 'brak'};return x})
      console.log(info)

    let possibleverifid = "brak"
    const verifd = dbuser.verified
    console.log(verifd)
    if (verifd == true) {
      possibleverifid = `tak`
    } else { possibleverifid = 'nie' }

    const userprofile = new EmbedBuilder()

      .setColor("#a47cff")
      .setTitle(`Profil ${user.username}`)
      .setDescription('Informacje:')
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
      .addFields(
        { name: 'Imię:', value: info[0], inline: true },
        { name: 'Nick:', value: info[1], inline: true },
        { name: 'Nazwisko:', value: info[2], inline: true },
        { name: ' ', value: `**Klasa:** ${info[3]}\n**Spersonalizowany:** ${possibleverifid}` })
        .setFooter({text:`ID: ${user.id}`})
      .setTimestamp();

    interaction.reply({ embeds: [userprofile] })
  }
};
