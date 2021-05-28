module.exports = {
    name: ['test', 't'],
    roles: ['🌟'],
    cooldown: 100,
    callback: message => {
        message.lineReply('Test(s) Successful').then(msg => { msg.delete({ timeout: 5000 }); message.delete({ timeout: 5000 }); })
    }
}