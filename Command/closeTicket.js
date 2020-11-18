const Discord = require('discord.js');

module.exports.run = (client, message) => {

    let channelToGet = message.channel["name"];
    if(channelToGet.indexOf("ticket-de-") === -1){
        message.channel.send("Tu n'est pas dans un ticket !")
    }else{
        let channelToDelete = message.guild.channels.cache.find(channel => channel.name === channelToGet)
        channelToDelete.delete("Ticket clos!");
    }
}

module.exports.help = {
    name: 'closeticket'
};