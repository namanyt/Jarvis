const { red } = require("chalk");
const { User, MessageEmbed, Message, Role } = require("discord.js");

/**
 * 
 * @param {Message} message 
 */
function checkUserIfAdmin(member) {
    if (member.hasPermission('ADMINISTRATOR')) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param {User} user 
 */
function checkUserIfBot(user) {
    if (user.bot) {
        return "<:check:845156477655187466>"
    } else {
        return ":x:"
    }
}

/**
 * 
 * @param {User} author 
 * @param {Number} wallet 
 * @param {Number} bank 
 * @returns 
 */
const balanceEmbed = (author, wallet, bank) => {
    const embed = 
    {
        title: `${author.username}'s Balance`,
        description: `**Wallet**: ⏣ ${wallet}\n**Bank**: ⏣ ${bank}`,
        footer: { text: author.tag, icon_url: author.avatarURL() }, 
        timestamp: new Date(),
    }
    return { embed: embed };
}

/**
 * @param {User} user
 * @param {Message} message
 */
const userInfoEmbed = (user, message) => {
    const inline = true;
    const member = message.guild.members.cache.get(user.id)
    const Embed = {
        author: { name: "Information" },
        color: member.roles.highest.color,
        title: `User Information For ${user.username}`,
        fields: [
            {
                name: "ID",
                value: `${user.id}`,
                inline: false
            },
            {
                name: "Discriminator",
                value: `${user.discriminator}`,
                inline: inline
            },
            {
                name: "Bot?",
                value: `${checkUserIfBot(user)}`,
                inline: inline
            },
            {
                name: "Admin",
                value: `${checkUserIfAdmin(member)}`,
                inline: inline
            },
            {
                name: "Created on",
                value: `${new Date(user.createdTimestamp).toLocaleDateString()}`,
                inline: inline
            },
            {
                name: "Joined on",
                value: `${new Date(member.joinedTimestamp).toLocaleDateString()}`,
                inline: inline
            },
            {
                name: "Top Role",
                value: `${member.roles.highest}`,
                inline: inline
            },
            {
                name: 'Nº of roles',
                value: `${member.roles.cache.size - 1}`
            }
        ],
        footer: { text: `Invoked by ${user.tag}`, icon_url: `${user.displayAvatarURL({ dynamic: true })}`},
        timestamp: new Date(),
        thumbnail: { url: user.displayAvatarURL({ dynamic: true }) },
    }

    return { embed: Embed }
}

/**
 * 
 * @param {Message} message 
 * @param {User} user 
 * @param {string} permission 
 * @param {string} text
 */
const permissionErrorEmbed = (message, user, permission) => {
    const member = message.guild.members.cache.get(user.id)
    const embed = {
        title: "Permission Error",
        description: `You don't have \`${permission}\` to run this command`,
        color: ("#FF0000")
    }

    return { embed: embed }
}

/**
 * 
 * @param {Message} message 
 * @param {User} user 
 * @param {Role} role 
 */
const rolePermissionError = (message, user, role) => {
    const member = message.guild.members.cache.get(user.id)
    const embed = {
        title: 'Role Error',
        description: `You don't have ${role} to run this command`,
        color: "#FF0000"
    }

    return { embed: embed }
}

/**
 * 
 * @param {Message} message 
 * @param {User} user 
 * @param {number} timeLeft 
 */
const onCooldownEmbed = (message, user, timeLeft) => {
    const member = message.guild.members.cache.get(user.id)
    const embed = {
        title: 'Cooldown Error',
        description: `Please wait for ${timeLeft.toFixed()} seconds to run this command again`,
        color: "#FF0000"
    }
    return { embed: embed }
}

module.exports = { balanceEmbed, userInfoEmbed, permissionErrorEmbed, rolePermissionError, onCooldownEmbed };