const { info, config, botOnline, mongo } = require('./src/Utils/Utils');
const chalk = require('chalk');
const discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Utils = require("./src/Utils/Utils");
require('events').EventEmitter.prototype._maxListeners = 1000;

const client = new discord.Client();
require('discord-buttons')(client);
client.cooldowns = new discord.Collection();

client.on("ready", async() => {
    botOnline();
    await mongo().then(mongoose => {
        try {
            info(`${chalk.hex(Utils.colors.Mongo).bold('[MONGODB]')} ${'Connected to '+ chalk.hex(Utils.colors.Mongo).bold('MongoDB')}`);
        } finally {
            mongoose.connection.close();
        }
    });
    readCommand('src/Commands')
    Utils.ResolveStatus(client)
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