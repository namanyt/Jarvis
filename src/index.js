const discord = require('discord.js');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const config = YAML.parse(fs.readFileSync('./config.yml', 'utf-8'), { prettyErrors: true });

const client = new discord.Client();

// Handling Events
const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
    } else {
        client.on(event.name, (...args) => event.run(...args));
    }
}

// Handling Commands


client.login(config.TOKEN);