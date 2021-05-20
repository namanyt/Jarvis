module.exports = {
    name: 'test',
    roles: ['Users'],
    callback: message => {
        message.channel.send("Test(s) Successful");
    }
}