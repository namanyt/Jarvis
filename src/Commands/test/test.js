module.exports = {
    name: ['test', 't'],
    roles: ['🌟'],
    cooldown: 100,
    callback: message => {
        message.channel.send("Test(s) Successful");
    }
}