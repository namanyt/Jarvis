const { Message, Client } = require("discord.js");
const economy = require('../../Utils/Economy');

module.exports = {
    name: ['deposit', 'dep'],
    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {string} text
     * @param {Client} client
     */
    callback: async (message, args, text, client) => {
        let subCommand = args[0]
        const currentBalance = economy.getCoins(message.guild, message.author)
        if (subCommand == 'max' || subCommand == 'all') {
            const status = await economy.depositBalanceAll(message.guild, message.author)
            message.channel.send(status)
        } else {
            const amount = parseInt(args[0])
            if (!amount) return message.channel.send(`Provided argument was not a valid number.`)
            if (isNaN(amount)) return message.channel.send(`Provided argument was not a valid number.`)
            if (amount <= 0) return message.channel.send(`Number can't be below 0`)
            if (currentBalance[0] < amount) return message.channel.send(`You don't have enough coins to deposit`)
            const status = await economy.depositBalance(message.guild, message.author, amount)
            message.channel.send(status)
        }
        
    }
}