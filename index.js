const { info, config, botOnline, mongo } = require('./src/Utils/Utils');
const chalk = require('chalk');
const discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new discord.Client();
client.cooldowns = new discord.Collection();

client.on("ready", async() => {
    botOnline();
    await mongo().then(mongoose => {
        try {
            info(`${chalk.green.bold('[MONGODB]')} ${'Connected to '+ chalk.green.bold('MongoDB')}`);
        } finally {
            mongoose.connection.close();
        }
    });
    readCommand('src/Commands')
});

client.login(config.TOKEN);

// Handle Commands
const readCommand = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.lstatSync(path.join(dir, file));
        if (stat.isDirectory()) {
            readCommand(path.join(dir, file));
        } else if (file !== 'Command-Base.js') {
            const options = require(`./${path.join(dir, file)}`);
            const command = require('./src/Commands/Command-Base');
            command(client, options);

            // RunCommand(client, name, usage, permissonError, minArgs, maxArgs, permissions, roles, callback);
        }
    }
}

module.exports = { readCommand };