const Discord = require('discord.js');
const { Player } = require('discord-player');

module.exports.run = (client, message) => {

const player = new Player(client);

const prefix = '!';

client.player = player;

client.player.on('trackStart', (message, track) => message.channel.send(`Je joue désormais ${track.title}...`));

client.player.on('trackAdd', (message, queue, track) => message.channel.send(`${track.title} a été ajouté a la liste!`))

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

client.player.play(message, args[0], { firstResult: true});


}

module.exports.help = {
    name: 'play'
};