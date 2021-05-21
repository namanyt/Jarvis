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
        const amount = await economy.getCoins(message.guild, target)
        message.channel.send(balanceEmbed(target, await amount[0], await amount[1]));
    } 
}