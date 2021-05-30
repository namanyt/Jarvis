const { Message, Client } = require("discord.js")
const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: ['meme'],
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {string} text 
     * @param {Client} client 
     */
    callback: (message, args, text, client) => {
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${memeTitle}`)
                    .setURL(`${memeUrl}`)
                    .setColor('RANDOM')
                    .setImage(memeImage)
                    .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

                const memeEmbed = {
                    title: `${memeTitle}`,
                    url: `https://reddit.com${permalink}`,
                    color: ('RANDOM'),
                    image: { url: memeImage },
                    footer: { text: `👍 ${memeUpvotes} | 💬 ${memeNumComments}`}
                }
                
                message.channel.send({ embed: memeEmbed })
            })
            .catch(console.error);
    },
}