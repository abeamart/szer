const archivedb = require('../models/archivedb')


require('dotenv').config();

const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]

const days = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"]

function readdate(thedate) {
    if (!thedate) return
    let todayref = new Date()
    let todayref2 = new Date()

    if (thedate.includes('nj') || thedate.includes('na jutro')) { todayref.setDate(todayref.getDate() + 1); return todayref }
    // if (thedate.includes('nnl') || thedate.includes('na nastepna lekcje' || thedate.includes('na nastepną lekcję'))) { console.log('na nastepną lekcję'); return }

    const splitmes = thedate.split((/[,.;| -]/)).filter(elm => elm)
    let datedata = []
    let i = 0
    splitmes.forEach(el => {
        console.log(el, i)
        if (i == 0 && el.startsWith(('+'))) {
            if (!isNaN(Number(el.substring(1)))) {
                console.log('fghuifghuifd')
                todayref.setDate(Number(el.substring(1)) + todayref.getDate())
                i = 10
            }
        }

        if (i == 0 && !isNaN(Number(el)) && Number(el) < 32) {
            datedata[0] = Number(el)
            i = 1

        } else if (i == 1) {
            if (!isNaN(Number(el)) && Number(el) < 13) {
                datedata[1] = Number(el) - 1
                i = 2
            } else {
                months.forEach(mtname => {
                    if (mtname.includes(el)) {
                        console.log(mtname,months.indexOf(mtname))
                        datedata[1] = months.indexOf(mtname);
                        i = 2
                    }
                });
            }
        } else if (i == 2) {
            if (!isNaN(Number(el))) {
                if (Number(el) > 2000) {
                    datedata[2] = Number(el)
                } else { datedata[2] = Number(el) + 2000 }

                i = 3
            }
        }
    });
    
    console.log(datedata)
    if (i == 10) { return todayref }
    else if (datedata[0]) {
        todayref.setDate(datedata[0])
        if (!isNaN(Number(datedata[1]))) {
            console.log(datedata[1])
            todayref.setMonth(datedata[1])
        } else if (todayref2.getDate()<=datedata[0]) {
            todayref.setMonth(todayref2.getMonth())
        } else { todayref.setMonth(todayref2.getMonth()+1) }
        if (!isNaN(Number(datedata[2]))) {
            todayref.setFullYear(datedata[2])
        }
        return todayref
    } else { return thedate }
}

module.exports = async (interaction, channel, descriptionarg, typearg, datearg) => {

    if (channel.type == 11) {
        if (interaction) { await interaction.deferReply({ ephemeral: true }) }

        const olddata = await archivedb.findOne({ Id: channel.id })
        console.log(olddata)

        if (olddata) {

            if (interaction) { interaction.editReply({ content: 'hm.. ten kanał był już zarchiwizowany, podmienie', ephemeral: true }) }

            if (olddata.messageid && olddata.messageid !== "brak") {
                await channel.messages.fetch(olddata.messageid)
                    .then(async message => { console.log(await message.delete()) }).catch(console.error);

                console.log(await archivedb.findByIdAndDelete(olddata.id))
            }
        } else {
            if (interaction) { interaction.editReply({ content: 'zrobione!', ephemeral: true }) }
        }



        let description = descriptionarg
        let type = typearg
        let date = datearg

        if (type == null) {
            const tags = channel.appliedTags
            if (tags[0]) { type = tags.map(s => channel.parent.availableTags.find(t => t.id === s)).map(x => x.name).join(" / ") }
            else { type = 'brak' }
        }
        const startermess = await channel.fetchStarterMessage()
        const startermesscont = startermess.content
        console.log(startermesscont)
        let newdate = new Date()
        newdate.setDate(newdate.getDate() + 7);

        if (date) { console.log('found date'); newdate = readdate(date) }
        else if (olddata) { console.log('found old date'); newdate = olddata.dateobj } else if (startermesscont !== '') { console.log('found new date'); newdate = readdate(startermesscont) } else { console.log('nothing found') } //else { date = `${newdate.getFullYear()}-${(newdate.getMonth()).toString().padStart(2, "0")}-${newdate.getDate().toString().padStart(2, "0")}` }

        if (description == null) { description = channel.name }


        let datestring = ''
        let dateobj = new Date()
        dateobj.setDate(dateobj.getDate() + 7);

        if (newdate instanceof Date) {
            const rn = new Date()
            if (newdate.getFullYear() == rn.getFullYear()) {
                datestring = `${newdate.getDate()} ${months[newdate.getMonth()]} (${days[newdate.getDay()]})`
            } else { datestring = `${newdate.getDate()} ${months[newdate.getMonth()]} ${newdate.getFullYear()} (${days[newdate.getDay()]})` }

            console.log(datestring)
            dateobj = newdate
        }
        else {
            datestring = newdate
        }
        console.log(datestring)
        console.log(dateobj)
        const newdata = new archivedb({
            description: description,
            type: type,
            date: datestring,
            dateobj: dateobj,
            Id: channel.id,
            messageid: 'brak'
        });
        await newdata.save();
        const botchan = await channel.guild.channels.fetch(process.env.BOT_COMUNNICATION_CHAN)
        botchan.send(`embedarchiwacji ${newdata.id}`)


    }
    else {
        if (interaction) { interaction.reply({ content: 'można tylko archiwizować kanały wątkowe!', ephemeral: true }) }
    }
}