module.exports = {
    name: 'ping',
    cooldown: 50,
    callback: message => {
        message.channel.send("Pong");
    }
}