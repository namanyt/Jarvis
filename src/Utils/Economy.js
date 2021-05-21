const chalk = require('chalk');
const { Guild, User } = require('discord.js');
const profileSchema = require('../Schema/profile-schema');
const { mongo, info } = require('./Utils');

module.exports = (client) => { }

/**
 * 
 * @param {Guild} guild 
 * @param {User} user 
 * @returns 
 */
module.exports = {
    getCoins: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                const result = await profileSchema.findOne({ userID: user.id })
                let wallet = 100;
                let bank = 0;
                if (result) {wallet = result.wallet, bank = result.bank}
                else await new profileSchema({ userID: user.id, username: user.tag, wallet, bank }).save()
                return [wallet, bank];
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    depositBalance: async (guild, user, amount) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                const updatesBalance = profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet - amount, bank: data.bank + amount })
                return updatesBalance
            } finally {
                //mongoose.connection.close()
            } 
        })
    },
    depositBalanceAll: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                const updatesBalance = profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet - data.wallet, bank: data.bank + data.wallet })
                return updatesBalance
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    withdrawBalance: async (guild, user, amount) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                const updatesBalance = profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet + amount, bank: data.bank - amount })
                return updatesBalance
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    withdrawBalanceAll: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                const updatesBalance = profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet + data.bank, bank: data.bank - data.bank })
                return updatesBalance
            } finally {
                //mongoose.connection.close()
            }
        })
    },
}