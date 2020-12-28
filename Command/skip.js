const Discord = require('discord.js');
const { Player } = require('discord-player');

module.exports.run = (client, message) => {

const player = new Player(client);

client.player = player;

client.player.skip("je passe a la suivante !")


}

module.exports.help = {
    name: 'stop'
};