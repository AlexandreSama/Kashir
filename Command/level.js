const Discord = require('discord.js');
const leveling = require('discord-leveling');

module.exports.run = async (client, message) => {

    let user = message.mentions.users.first() || message.author
 
    let output = await leveling.Fetch(user.id)
    message.channel.send(`Salut ${user}, Tu est actuellement au niveau ${output.level} avec ${output.xp} xp!`);
}

module.exports.help = {
    name: 'level'
};