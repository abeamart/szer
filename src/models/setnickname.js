const dbdata = require('../models/dbdata')


module.exports = async (interaction, user) => {
    const userdb = await dbdata.findOne({Id: user.id})
    const member = await interaction.guild.members.fetch(user.id)
    let newnick = ''
    userdb.info.desirednickname.forEach(el => {
        const obj = eval(`userdb.info.${el}`)
        
        if (obj) {
            newnick += obj + " "
        }
        
    });
    if (newnick !== '') {
        await member.setNickname(newnick).then(member => console.log(`Set nickname of ${member.user.username} to ${newnick}`))
        .catch(console.error);
    }
    

}