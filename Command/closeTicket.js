const Discord = require('discord.js');

module.exports.run = (client, message) => {

    //On prend le nom du channel ou la commande a été faite
    let channelToGet = message.channel["name"];
    //Si le nom du channel ne commence pas par "ticket-de-"
    if(channelToGet.indexOf("ticket-de-") === -1){
        message.channel.send("Tu n'est pas dans un ticket !")
    }else{
        //On récupère le channel spécifique dans une variable et on le delete
        let channelToDelete = message.guild.channels.cache.find(channel => channel.name === channelToGet)
        channelToDelete.delete("Ticket clos!");
    }
}

module.exports.help = {
    name: 'closeticket'
};