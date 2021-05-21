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
    await mongoose.connect(mongoPath, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, });
    return mongoose;
}
const getTimeDiffrence = async (date1, date2) => {
    let lang = {
        Day: "{days} day",
        Days: "{days} days",
        Hour: "{hours} hour",
        Hours: "{hours} hours",
        Minute: "{minutes} minute",
        Minutes: "{minutes} minutes",
        Second: "{seconds} second",
        Seconds: "{seconds} seconds",
        About: "About ",
        LessThan: "Less than "
    }
    let d1 = new Date(date1)
    let d2 = new Date(date2)
    var msec = d2 - d1;
    let secs = Math.floor(msec / 1000);
    var mins = Math.floor(secs / 60);
    var hrs = Math.floor(mins / 60);
    var days = Math.floor(hrs / 24);
    let result = []

    secs = Math.abs(secs % 60)
    mins = Math.abs(mins % 60);
    hrs = Math.abs(hrs % 24);
    days = Math.abs(days % 365);

    if (days !== 0) days == 1 ? result.push("" + lang.Day.replace(/{days}/g, days)) : result.push("" + lang.Days.replace(/{days}/g, days))
    if (hrs !== 0) hrs == 1 ? result.push("" + lang.Hour.replace(/{hours}/g, hrs)) : result.push("" + lang.Hours.replace(/{hours}/g, hrs))
    if (mins !== 0) mins == 1 ? result.push("" + lang.Minute.replace(/{minutes}/g, mins)) : result.push("" + lang.Minutes.replace(/{minutes}/g, mins))
    if (secs !== 0) secs == 1 ? result.push("" + lang.Second.replace(/{seconds}/g, secs)) : result.push("" + lang.Seconds.replace(/{seconds}/g, secs))

    if (result.length == 1 && result[0].endsWith(lang.Seconds.replace(/{seconds}/g, ''))) {
        return lang.LessThan + result[0]
    } else {
        return lang.About + result.join(" ");
    }
}
const ResolveUser = (message, argument = 0, fullText = false) => {
    const args = message.content.split(" ");
    args.shift();
    const text = fullText ? message.content : (args[argument] || '');
    return message.guild.members.cache.find(m => m.user.tag.toLowerCase() == text.toLowerCase() || m.displayName.toLowerCase() == text.toLowerCase() || m.id == text.replace(/([<@]|[>])/g, '')) || message.mentions.members.first();
}

module.exports = { info, error, botOnline, config, mongo, getTimeDiffrence, ResolveUser };