const { info, config } = require('../Utils/Utils');
const prefix = config.PREFIX;
const chalk = require('chalk');
    
const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`There is no permission called '${permission}'`)
        }
    }
}

module.exports = (client, options) => {
    let {
        name,
        usage = '',
        permissionError = 'You don\'t have Rermission(s) / Role to run this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        roles = [],
        callback
    } = options;

    info((`Registering ${chalk.cyan.italic(name)} command`));

    if (typeof name === 'string') {
        name = [name]
    }

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions];
        }

        validatePermissions(permissions);
    }

    if (typeof roles === 'string') {
        roles = [roles]
    }


    // Listen for messages
    client.on('message', (message) => {
        const { member, content, guild } = message

        for (const alias of name) {
            const command = `${prefix}${alias.toLowerCase()}`

            if (
                content.toLowerCase().startsWith(`${command} `) ||
                content.toLowerCase() === command
            ) {
                // A command has been ran

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                // Ensure the user has the required roles
                for (const _role of roles) {
                    const role = guild.roles.cache.find(
                        (role) => role.name === _role
                    )

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(
                            `You must have the "${_role}" role to use this command.`
                        )
                        return
                    }
                }

                // Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                // Remove the command which is the first index
                arguments.shift()

                // Ensure we have the correct number of arguments
                if (
                    arguments.length < minArgs ||
                    (maxArgs !== null && arguments.length > maxArgs)
                ) {
                    message.reply(
                        `Incorrect syntax! Use ${prefix}${alias} ${usage}`
                    )
                    return
                }

                // Handle the custom command code
                callback(message, arguments, arguments.join(' '), client)

                return
            }
        }
    })
}