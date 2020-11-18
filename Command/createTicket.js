const Discord = require('discord.js');

module.exports.run = (client, message) => {

    let user = message.author;
    var channelName = `ticket-de-` + user.username.toLowerCase();

    let categoryFicheName = "tickets"
    let categoryFiche = message.guild.channels.cache.find(cat=> cat.name === categoryFicheName)
    let channel = message.guild.channels.cache.find(channel => channel.name === channelName)

    if(channel === undefined){
        message.guild.channels.create(channelName, {
            type: 'text',
            parent: categoryFiche.id
        }).then(() => {
            let channel = message.guild.channels.cache.find(channel => channel.name === channelName)
            console.log(channel)
            channel.send("Bienvenue <@" + user.id + ">" + ", tu peut désormais poser tes questions ici et l'on te répondra sous peu !");
        })
    }else {
        message.channel.send("Tu a déjà un ticket ouvert !")
    }

}

module.exports.help = {
    name: 'createticket'
};