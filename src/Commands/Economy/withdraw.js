const { Message, Client } = require("discord.js");
const economy = require('../../Utils/Economy');

module.exports = {
    name: ['withdraw', 'with'],
    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {string} text
     * @param {Client} client
     */
    callback: async (message, args, text, client) => {
        let subCommand = args[0]
        const currentBalance = await economy.getCoins(message.guild, message.author)
        if (subCommand == 'max' || subCommand == 'all') {
            const status = await economy.withdrawBalanceAll(message.guild, message.author)
            message.channel.send(status)
        } else {
            const amount = parseInt(args[0])
            if (!amount) return message.channel.send(`Provided argument was not a valid number.`)
            if (isNaN(amount)) return message.channel.send(`Provided argument was not a valid number.`)
            if (amount <= 0) return message.channel.send(`You cannot withdraw below 0 coins`)
            if (currentBalance[1] < amount) return message.channel.send(`You don't have enough coins to withdraw`)
            const status = await economy.withdrawBalance(message.guild, message.author, amount)
            message.channel.send(status)
        }

    }
}