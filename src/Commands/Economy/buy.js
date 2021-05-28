const { Message, Client } = require("discord.js");
const { showShop } = require("../../Utils/Utils");

module.exports = {
    name: ['buy', 'purchase'],
    usage: 'item\'s Id',
    minArgs: 1,
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: (message, args, text, client) => {
        const item = args[0]
        const shop = showShop();
        for (items of shop) {
            const _id = items.Id
            if (item == _id) return message.channel.send(`Buying \`${items.Id}\` for \`⏣${items.Price}\``)
            else return message.channel.send('Item not found').then(msg => { msg.delete({ timeout: 5000 }); message.delete({ timeout: 5000 }); });
        }
    },
}