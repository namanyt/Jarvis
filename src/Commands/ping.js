module.exports = {
    name: 'ping',
    callback: message => {
        message.channel.send("Pong");
    }
}