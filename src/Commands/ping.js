module.exports = {
    name: 'ping',
    permissions: ['ADMINISTRATOR'],
    cooldown: 50,
    callback: message => {
        message.channel.send("Pong");
    }
}