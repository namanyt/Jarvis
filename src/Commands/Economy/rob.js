const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require("../../Utils/Economy");
const Utils = require('../../Utils/Utils')

module.exports = {
    name: ['rob'],
    cooldown: 30,
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: async (message, args, text, client) => {
        const target = message.mentions.users.first()
        if (!target) return message.channel.send('You cannot rob undefined')
        const AuthorAmount = await Economy.getCoins(message.guild, message.author)
        const TargetAmount = await Economy.getCoins(message.guild, target)
        if (TargetAmount[0] <= 100) return message.channel.send('They don\'t have enough to be robbed :p')
        if (AuthorAmount[0] <= 100) return message.channel.send('You dont have to rob someone (better get a job)')
        const amount = await Economy.robUser(message.author, target)
        // await Economy.robUser(message.author, target, amount)
        if (amount < 0) return message.channel.send(`You were caught while robbing that user and u had to pay them ⏣${amount * -1}`)
        message.channel.send(`You successfully robbed that user and got ⏣${amount}`)
    }
}