const { Message, Client } = require("discord.js");
const Economy = require('../../Utils/Economy');
const { info } = require("../../Utils/Utils");

module.exports = {
    name: ['rich', 'moneylb'],
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: async(message, args, text, client) => {
        message.channel.send(await Economy.currencyLeaderboard(message.guild))
    }
}