const { Message, Client } = require("discord.js");

module.exports = {
    name: ['clear', 'purge'],
    permissionError: 'You no staff',
    permissions: ['MANAGE_MESSAGES'],
    roles: ['🌟'],
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     * @returns 
     */
    callback: (message, args, text, client) => {
        if (!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99').then(msg => msg.delete({ timeout: 2000 }));;
        if (isNaN(args[0])) return message.channel.send('Numbers are only allowed');
        if (parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99').then(msg => msg.delete({ timeout: 2000 }));;

        message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => bot.logger.error(err));
        message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete({ timeout: 2000 }));;
    },
}