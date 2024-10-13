const setnickname = require('../models/setnickname')
const dbdata = require('../models/dbdata')
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const grading1 = ['1', '2', '3', '4']
const grading2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

module.exports = {
  data: new SlashCommandBuilder()
    .setName('personalizacja')
    .setDescription('jeśli określono użytkownika stworzy dla niego sesję, inaczej - stworzy okienko personalizacji')
    .addUserOption((option) => option.setName('użytkownik').setDescription("określ użytkownika, którego sesję personalizacji chcesz rozpocząć").setRequired(false))
    .addStringOption((option) => option.setName('imię').setDescription("imię, które chcesz ustawić/zmienić (opcjonalne)"))
    .addStringOption((option) => option.setName('nick').setDescription("nick, który chcesz ustawić/zmienić (opcjonalne)"))
    .addStringOption((option) => option.setName('nazwisko').setDescription("nazwisko, na które chcesz ustawić/zmienić (opcjonalne)"))
    .addStringOption((option) => option.setName('klasa').setDescription("klasa, na którą chcesz ustawić/zmienić (opcjonalne)")),
  run: async ({ interaction, client, handler }) => {
    let user = interaction.options.getUser('użytkownik')
    const name = await interaction.options.getString('imię')
    const desirednick = await interaction.options.getString('nick')
    const surname = await interaction.options.getString('nazwisko')
    const grade = await interaction.options.getString('klasa')



    let info = [[name, "name", "imię"], [desirednick, "desirednick", "nick"], [surname, "surname", "nazwisko"], [grade, "grade", "klasa"]].filter(x => x[0])
    let newinfo = []
    let iserror = ''

    const botchan = await interaction.guild.channels.fetch(process.env.BOT_COMUNNICATION_CHAN)

    if (info.length == 0) {
      if (user == null) {
        botchan.send(`oknopersonalizacji ${await interaction.channelId}`)
        interaction.reply({ content: 'zrobiono nowe okienko personalizacji!', ephemeral: true })
        return;
      } else {
        botchan.send(`botowapersonalizacja ${user.id}`)
        interaction.reply({ content: 'zrobiono nową sesję personalizacji!', ephemeral: true })
        return
      }
    }
    if (user == null) { user = interaction.member } else { user = await interaction.guild.members.fetch(user.id) }

    const posgrade = info[info.length - 1]
    if (posgrade[1] == "grade" && !posgrade[0] == 2 || !grading1.includes(posgrade[0][0]) || !grading2.includes(posgrade[0][1].toUpperCase())) {
      if (await user.roles.cache.has(process.env.ADMIN_ROLE) == true) {
        iserror = `dany użytkownik jest moderatorem i jego klasa nie może być zmieniona\n\n`
        info.pop()
      } else { iserror = `klasa, którą podałeś nie istnieje (${posgrade[0]}), zostanie zignorowana\n\n`; info.pop() }
    } else { posgrade[0] = posgrade[0].toUpperCase() }
    const dbinfo = await dbdata.findOne({ Id: user.id })
    let upddoc = []


    info.forEach(el => {

      upddoc.push({ $set: { [`info.${el[1]}`]: el[0] } })
      newinfo.push(` ${el[2]}: ${el[0]}`)

    })

    await dbinfo.updateOne(upddoc)

    interaction.reply({ content: `${iserror}dla ${user} ustawiono: ( ${newinfo} )`, ephemeral: true })

    setnickname(interaction, user)
  }
};
