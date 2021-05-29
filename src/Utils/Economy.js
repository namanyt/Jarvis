const chalk = require('chalk');
const { Guild, User } = require('discord.js');
const profileSchema = require('../Schema/profile-schema');
const { mongo, info } = require('./Utils');
const Utils = require("../Utils/Utils");

module.exports = (client) => { }


module.exports = {
    /**
     *
     * @param {Guild} guild
     * @param {User} user
     * @returns
     */
    getCoins: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                const result = await profileSchema.findOne({ userID: user.id })
                let wallet = 100;
                let bank = 0;
                if (result) { wallet = result.wallet, bank = result.bank }
                else await new profileSchema({ guildID: guild.id, userID: user.id, username: user.tag, wallet, bank, inventory: {} }).save()
                return [wallet, bank];
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    /**
     * 
     * @param {Guild} guild 
     * @param {User} user 
     * @param {number} amount 
     * @returns 
     */
    depositBalance: async (guild, user, amount) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                if (!data) return 'you dont even have a account to deposit money'
                const updatesBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet - amount, bank: data.bank + amount })).save()
                return `Deposited ⏣${amount}`
            } finally {
                //mongoose.connection.close()
            } 
        })
    },
    /**
     *
     * @param {Guild} guild
     * @param {User} user
     * @param {number} amount
     * @returns
     */
    depositBalanceAll: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                if (!data) return 'you dont even have a account to deposit money'
                const updatesBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet - data.wallet, bank: data.bank + data.wallet })).save()
                return `Deposited all`
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    /**
     *
     * @param {Guild} guild
     * @param {User} user
     * @param {number} amount
     * @returns
     */
    withdrawBalance: async (guild, user, amount) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                if (!data) return 'You dont event have a account to withdraw money'
                const updatesBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet + amount, bank: data.bank - amount })).save()
                return `Withdrew ⏣${ amount }`
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    /**
     *
     * @param {Guild} guild
     * @param {User} user
     * @param {number} amount
     * @returns
     */
    withdrawBalanceAll: async (guild, user) => {
        return await mongo().then(async mongoose => {
            try {
                let data = await profileSchema.findOne({ userID: user.id })
                if (!data) return 'You dont event have a account to withdraw money'
                const updatesBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: data.wallet + data.bank, bank: data.bank - data.bank })).save()
                return `Withdrew all`
            } finally {
                //mongoose.connection.close()
            }
        })
    },
    /**
     *
     * @param {User} user
     * @param {User} target
     * @param {number} amount
     * @returns
     */
    payUser: async (user, target, amount) => {
        return await mongo().then(async mongoose => {
            if (!user || !target) {
                throw new Error('Incomplete parameters')
            }
            try {
                let AuthorData = await profileSchema.findOne({ userID: user.id })
                let TargetData = await profileSchema.findOne({ userID: target.id })
                const AuthorUpdatedBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: AuthorData.wallet - amount})).save()
                const TargetUpdatedBalance = (await profileSchema.findOneAndUpdate({ userID: target.id }, { wallet: TargetData.wallet + amount})).save()
                return [AuthorUpdatedBalance, TargetUpdatedBalance]
            } finally {
                // mongoose.connection.close()
            }
        })
    },
    /**
     *
     * @param {User} user
     * @param {User} target
     * @param {number} amount
     * @returns
     */
    robUser: async (user, target) => {
        return await mongo().then(async mongoose => {
            if (!user || !target) {
                throw new Error('Incomplete parameters')
            }
            try {
                let AuthorData = await profileSchema.findOne({ userID: user.id })
                let TargetData = await profileSchema.findOne({ userID: target.id })
                let amount = Utils.randomIntFromInterval(-AuthorData.wallet, TargetData.wallet/2)
                const AuthorUpdatedBalance = (await profileSchema.findOneAndUpdate({ userID: user.id }, { wallet: AuthorData.wallet + amount })).save()
                const TargetUpdatedBalance = (await profileSchema.findOneAndUpdate({ userID: target.id }, { wallet: TargetData.wallet - amount })).save()
                return amount
            } finally {
                // mongoose.connection.close()
            }
        })
    },

    /**
     * @param {Guild} guild
     * @returns 
     */
    currencyLeaderboard: async (guild) => {
        return await mongo().then(async mongoose => {
            try {
                const a = await profileSchema.find({ guildID: guild.id }).sort({ wallet: -1 })
                let i = 1
                let data = a.map(user => `\`#${i++}\` ${user.wallet} - ${user.username}`).join("\n")
                return { embed: { 
                    title: "Money LeaderBoard",
                    description: data,
                    footer: { text: 'These are wallet coins, Not total.' }
                }}
            } finally {
                // mongoose.connection.close()
            }
        })
    }
}