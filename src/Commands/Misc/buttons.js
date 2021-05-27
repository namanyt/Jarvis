const { Message, Client, Emoji } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: ['buttons'],
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: (message, args, text, client) => {
        let btn = new MessageButton(    )
            .setLabel('This is my label!')
            .setStyle('url')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setID('Click Me !')
        
        message.channel.send(`Ayo`, btn);
    },
}