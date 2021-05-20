const { Message } = require("discord.js");
const { info } = require('../../Utils/Utils');
const economy = require("../../Utils/Economy");

module.exports = {
    name: ['balance', 'bal'],
    usage: 'Target user\'s @',
    maxArgs: 1,
    /**
     * 
     * @param {Message} message 
     */
    callback: async message => {
        const target = message.mentions.users.first() || message.author;
        const targetID = target.id;

        const guildID = message.guild.id
        const userID = targetID

        const coins = await economy.getCoins(guildID, userID)
            
        message.channel.send(`That user has ${coins} coins !`)

        info(targetID);
    } 
}