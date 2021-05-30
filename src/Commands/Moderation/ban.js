const { Message, Client } = require("discord.js");
const { error, ResolveUser } = require("../../Utils/Utils");

module.exports = {
    name: ['ban'],
    permissionError: 'U aint Mod here',
    permissions: ['BAN_MEMBERS'],
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
        const user = ResolveUser(message) || message.member;
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({
                        reason: 'They were bad!',
                    })
                    .then(() => {
                        message.reply(`Successfully banned ${member.user.tag}`);
                    })
                    .catch(err => {
                        message.reply('I was unable to ban that member');
                        error(err)
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
}