const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("../../Utils/Economy");
const utils = require('../../Utils/Utils');

module.exports = {
    name: ['give', 'pay'],
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: async (message, args, text, client) => {
        const target = message.mentions.users.first()
        if (!target) return message.channel.send('Mention a user to pay to ')
        const TargetAmount = await economy.getCoins(message.guild, target)
        const AuthorAmount = await economy.getCoins(message.guild, message.author)
        const amount = parseInt(args[1])
        if (!amount) return message.channel.send(`Provided argument was not a valid number.`)
        if (isNaN(amount)) return message.channel.send(`Provided argument was not a valid number.`)
        if (amount <= 0) return message.channel.send(`Number can't be below 0`)
        if (AuthorAmount[0] < amount) return message.channel.send(`You don't have enough coins to pay`)
        await economy.payUser(message.author, target, amount)
        const payEmbed = new MessageEmbed()
            .setTitle('Payment')
            .setDescription(`Now that user has ⏣${parseInt(TargetAmount) + amount}`)
        message.channel.send(payEmbed);
    }
}