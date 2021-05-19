const discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const colors = require('colors');

class Bot extends discord.Client {
    constructor() {
        super();
        this.config = yaml.loadAll(fs.readFileSync('./config.yml', 'utf-8'))[0];
        this.token = this.config.TOKEN;
        this.prefix = this.config.PREFIX;
    }

    run() {
        this.login(this.token);
        this.on('ready', () => {
            
        });
    }
}

module.exports = Bot;
