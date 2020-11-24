const Discord = require('discord.js');

module.exports.run = (client, message) => {
    //On supprime le message pour rendre le channel plus propre
    message.delete();

    //On crée un nouvel embed contenant nos infos
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

    //Puis on envoie l'embed a travers un simple message
    message.channel.send(embed)
}

module.exports.help = {
    name: 'linkinfos'
};