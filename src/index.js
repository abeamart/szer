const keep_alive = require('../keep_alive.js')
require('dotenv').config();
    const {  Client, IntentsBitField, Options } = require('discord.js');
    const mongoose = require('mongoose')
    const { CommandHandler } = require('djs-commander');
    const path = require('path');
    
    const client = new Client({
      intents: [IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences], 
    });
    
    new CommandHandler({
      client, // Discord.js client object | Required by default
      commandsPath: path.join(__dirname, 'commands'), // The commands directory
      eventsPath: path.join(__dirname, 'events'), // The events directory
      validationsPath: path.join(__dirname, 'validations'), // Only works if commandsPath is provided
       // To register guild-based commands (if it's not provided commands will be registered globally)
    });
   /*client.on('interactionCreate',(interaction) => {
      
    }
    )
*/

(async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI,{
      dbName: 'test',
  });
    client.login(process.env.TOKEN);
  console.log('connected')
  } catch (error) {
    console.log(error)
  }
  
})();
//TODO: 

//NA NASTEPNY UPDATE
// /wydarzenia pokazuja wszystkie wydarzenia
//nnl