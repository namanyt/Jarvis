const { Message } = require("discord.js");
const { info } = require('../../Utils/Utils');
const economy = require("../../Utils/Economy");
const { balanceEmbed } = require('../../Models/Embed');

module.exports = {
    name: ['balance', 'bal'],
    usage: 'Target user\'s @',
    maxArgs: 1,
    /**
     * 
     * @param {Message} message 
     */
    callback: async message => {
        const target = message.mentions.users.first() || message.author
        message.channel.send(balanceEmbed(target, await economy.getCoins(message.guild, target)[0], await economy.getCoins(message.guild, target)[1]));
    } 
}