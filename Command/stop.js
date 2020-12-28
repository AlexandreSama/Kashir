const Discord = require('discord.js');
const { Player } = require('discord-player');

module.exports.run = (client, message) => {

const player = new Player(client);

client.player = player;

client.player.stop("Je m'arrête la !")


}

module.exports.help = {
    name: 'stop'
};