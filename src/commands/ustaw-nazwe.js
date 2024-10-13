const setnickname = require('../models/setnickname')
const dbdata = require('../models/dbdata')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('ustaw-pokazywanie-nicku')
    .setDescription("wybierz, które dane powinny pokazywać się w nazwie danego użytkownika")
    .addUserOption(option =>
      option.setName('dla-kogo')
        .setDescription('kogo nazwa ma się zmienić?'))
    .addBooleanOption(option =>
      option.setName('imię')
        .setDescription('czy chcesz, żeby imię pokazywało się w ich nazwie?'))
    .addBooleanOption(option =>
      option.setName('nick')
        .setDescription('czy chcesz, żeby nick pokazywał się w ich nazwie?'))
    .addBooleanOption(option =>
      option.setName('nazwisko')
        .setDescription('czy chcesz, żeby nazwisko pokazywało się w ich nazwie?'))
    .addBooleanOption(option =>
      option.setName('klasa')
        .setDescription('czy chcesz, żeby klasa pokazywała się w ich nazwie?')),


  run: async ({ interaction, client, handler }) => {
    const czyimie = interaction.options.getBoolean('imię')
    const czynick = interaction.options.getBoolean('nick')
    const czynazwisko = interaction.options.getBoolean('nazwisko')
    const czyklasa = interaction.options.getBoolean('klasa')
    const guy = interaction.options.getUser('dla-kogo')

    let finalguy = interaction.member

    const check = [[czyimie, "name"], [czynick, "desirednick"], [czynazwisko, "surname"], [czyklasa, "grade"]]

    //check if the dla-kogo interaction option was used and assigns it, defaults to interaction caster 
    if (guy !== null && guy.id !== interaction.member.id) {
      finalguy = await interaction.guild.members.fetch(guy.id)

    }

    const guydb = await dbdata.findOne({ Id: finalguy.id })

    // sort the objects into arrays: 'add' and 'remove'
    check.forEach(async el => {
      const obj = el[0]
      const ref = el[1]

      if (obj !== null) {

        if (obj == true) {
          //if the param is set to true then push it to the db
          if (guydb.info.desirednickname.includes(ref) == false) {

            await dbdata.findByIdAndUpdate(guydb.id,
              { $push: { [`info.desirednickname`]: ref } })

          }
        }
        else {
          //else pull it from the db
          await dbdata.findByIdAndUpdate(guydb.id,
            { $pull: { [`info.desirednickname`]: ref } })
          
        }
      }
    });

    setnickname(interaction, finalguy)
    interaction.reply('zmieniono nazwę użytkownika ^_~')
  }
}