const { info, config, botOnline } = require('./src/Utils/Utils');
const chalk = require('chalk');
const discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new discord.Client();

client.on("ready", () => {
    botOnline();

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