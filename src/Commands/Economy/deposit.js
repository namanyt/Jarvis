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
        switch(subCommand){
            case 'max':
                await economy.depositBalanceAll(message.guild, message.author)
                message.channel.send(`Deposited all`)
            break;

            case 'all':
                await economy.depositBalanceAll(message.guild, message.author)
                message.channel.send(`Deposited all`)
            break;

            default: 
            const amount = parseInt(args[0])
                if (!amount) return message.channel.send(`Provided argument was not a valid number.`)
                if (isNaN(amount)) return message.channel.send(`Provided argument was not a valid number.`)
                if (amount <= 0) return message.channel.send(`Number can't be below 0`)
                if (currentBalance[0] < amount) return message.channel.send(`You don't have enough coins to deposit`)
                await economy.depositBalance(message.guild, message.author, amount)
                message.channel.send(`Deposited ⏣${amount}`)
            break;
        }
        
    }
}