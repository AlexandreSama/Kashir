const Discord = require('discord.js');

module.exports.run = (client, message) => {
    message.delete();

    const embed = new Discord.MessageEmbed()
    .setColor("#5361ad")
    .setDescription("Voici les liens importants pour le bot !")
    .setAuthor("AlexandreSama")
    .setFooter("Made With Love")
    .addFields(
        { name: "Github", value: "https://github.com/AlexandreSama/Kashir"},
        {name: "NodeJS", value: "https://nodejs.org/en/"},
        {name: "DiscordJS", value: "https://discord.js.org/#/"},
        { name: "Github Creator", value: "https://github.com/AlexandreSama"}
    )
    .setTimestamp()

    message.channel.send(embed)
}

module.exports.help = {
    name: 'linkinfos'
};