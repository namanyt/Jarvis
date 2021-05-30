const { Message, Client } = require("discord.js");

module.exports = {
    name: ['kick'],
    permissionError: 'U aint Mod here',
    permissions: ['KICK_MEMBERS'],
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
        const target = message.mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${target.tag} That user has kicked`)
        } else {
            message.channel.send(`Please specify someone to kick.`)
        }
    },
}