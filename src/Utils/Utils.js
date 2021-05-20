const chalk = require('chalk');
const timestamp = chalk.hex(`#808080`).bold(`[${new Date().toLocaleTimeString()}]`);
const YAML = require('yaml');
const fs = require('fs');
const config = YAML.parse(fs.readFileSync('./src/config.yml', 'utf-8'), { prettyErrors: true });
const mongoose = require('mongoose');
const mongoPath = config.MongoDB;

const botOnlineColor = chalk.hex(`#0084db`);

function info(message) {
    return console.log(`${timestamp}  ${message}`);
}

/**
 * 
 * @param {Error} error 
 * @returns 
 */
function error(error) {
    return console.error(`${timestamp}  [ERROR (${error.name})] ${error.message}`);
}

function botOnline() {
    const onlineMessage = (
        `${timestamp}  ${botOnlineColor("#============================#")}\n` +
        `${timestamp}  ${botOnlineColor("#                            #")}\n` +
        `${timestamp}  ${botOnlineColor("#         BOT ONLINE         #")}\n` +
        `${timestamp}  ${botOnlineColor("#                            #")}\n` +
        `${timestamp}  ${botOnlineColor("#============================#")}`
    )

    return console.log(onlineMessage);
}

const mongo = async () => {
    await mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true});
    return mongoose;
}

module.exports = { info, error, botOnline, config, mongo };