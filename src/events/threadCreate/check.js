const archiwuj = require('../../models/archiwuj')

module.exports = async (channel, client, handler) => {

    if (channel.type == 11) {
        archiwuj(null, channel)
    }
}