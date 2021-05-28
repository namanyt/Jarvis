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
        const Develpers = message.guild.roles.cache.find(role => role.name == "Developer")
        const shop = Utils.showShop()

        const embed = new MessageEmbed()
            .setTitle('Shop')
            .setDescription('Dukan Bhai :p')
            .setTimestamp()

        for (let items of shop) {
            const _name = items.Name;
            const _description = items.Description.replace('@Developers', `${Develpers}`);
            const _price = `⏣${items.Price}`;
            const _id = items.Id;
            // `${_description}\n Id: \`${_id}\`\n[${_price}](https://discordjs.guide/popular-topics/embeds.html#embed-preview)`
            embed.addField(`** **`, `**${_name}** — [${_price}](https://www.youtube.com/watch?v=YddwkMJG1Jo)\n${_description}`, true);
        }
        return message.channel.send({ embed: embed })
    }
}