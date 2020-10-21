const Discord = require("discord.js");
const leveling = require('discord-leveling');

module.exports.run = async (client, message, args) => {

    message.delete();

    console.log(args)

    var amount = args[1]
    var user = message.mentions.users.first() || message.author
 
    var output = await leveling.SetXp(user.id, amount)
    message.channel.send(`Hey ${user.tag}! You now have ${amount} xp!`);

}

module.exports.help = {
    name: 'setxp'
};