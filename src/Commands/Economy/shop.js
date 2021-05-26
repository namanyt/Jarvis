const { Message, Client, MessageEmbed } = require("discord.js");
const Utils = require('../../Utils/Utils')

module.exports = {
    name: 'shop',   
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: (message, args, text, client) => {
        const category = args[0]
        const shop = Utils.showShop(category)
        if (!shop) return message.channel.send('Category not availabe')

        const embed = new MessageEmbed()
            .setTitle('Shop')
            .setDescription('Dukan Bhai :p')
            .setColor(Utils.colors.InvisibleEmbed)
            .setTimestamp()
        
        if (!category) {
            for (let categories of shop) embed.addField(`${categories.Name}`, `Id: \`${categories.Id}\` \nDescription: ${categories.description}`)
            return message.channel.send({ embed: embed })
        }        
        
        for (let items of shop) {
            const _name = items.Name;
            const _description = items.Description;
            const _price = items.Price;
            const _id = items.Id;
            embed.addField(`${_name}`, `Price: \`${_price}\`\n${_description}\nId: \`${_id}\``)
        }
        return message.channel.send({ embed: embed })
    }
}