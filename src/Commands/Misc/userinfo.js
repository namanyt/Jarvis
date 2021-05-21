const { Message, Client, MessageEmbed } = require("discord.js");
const { userInfoEmbed } = require('../../Models/Embed');
const Utils = require('../../Utils/Utils');

module.exports = {
    name: ['userinfo', 'ui'],
    maxArgs: 1,
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: async (message, args, text, client) => {
        const user = Utils.ResolveUser(message) || message.member;
        const target = message.mentions.users.first() || message.author;
        const embed = userInfoEmbed(target, message)
        //message.channel.send(embed);
        let inline = true
        const profileEmbed = new MessageEmbed()
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(new Date())
            .setFooter(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`User information for ${user.user.username}`)
            .setColor(user.roles.highest.color || '2f3136')
            .addField('User', `${user.user.tag} | ${user.user.id}`, false)
            .addField('Created on', user.user.createdAt.toLocaleString(), true)
            .addField('Joined at', user.joinedAt.toLocaleString(), true)
            .addField('Top Role', user.roles.highest, inline)
            .addField('Nº of roles', user.roles.cache.size - 1, inline)
            
        if(user.hasPermission('ADMINISTRATOR')) 
            profileEmbed.addField('Admin', '☑', inline)

        if(user.user.bot) 
            profileEmbed.addField('Bot', '☑', inline)

        if (user.nickname !== null && user.nickname !== user.user.username) 
            profileEmbed.setDescription(`This member is also known as ${user.nickname} in this server`)
  
        if(user.user.presence.status)
            profileEmbed.addField('Status', await module.exports.checkStatus(user.user.presence.status), inline)

        if(user.user.presence.activities.length > 0) 
            profileEmbed.addField('Custom Status', user.user.presence.activities[0].state, inline)
        message.channel.send(profileEmbed)
    },
    checkStatus: (presence) => {
        switch(presence){
            case 'dnd': return 'Do Not Disturb'
            case 'online': return 'Online'
            case 'idle': return 'Idle'
            case 'offline': return 'Offline'
        }
    }
}