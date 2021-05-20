const chalk = require('chalk');
const profileSchema = require('../Schema/profile-schema');
const { mongo, info } = require('./Utils');

module.exports = (client) => { }

module.exports.getCoins = async (guildID, userID) => {
    return await mongo().then(async mongoose => {
        try {
            info(`${chalk.green.bold('[MONGODB]')} ${'Running ' + chalk.yellow('findOne()')}`)

            const result = await profileSchema.findOne({
                guildID,
                userID
            })
            
            let coins = 0;
            if (result) {
                coins = result.coins
            } else {
                info(`${chalk.green.bold('[MONGODB]')} ${'Inserting a ' + chalk.yellow('document')}`)
                await new profileSchema({
                    guildID,
                    userID,
                    coins
                }).save()
            }

            return coins;
        } finally {
            mongoose.connection.close()
        }
    })
}