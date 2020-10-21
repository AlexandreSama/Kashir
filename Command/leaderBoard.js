const { createCanvas, loadImage} = require('canvas');
const Discord = require("discord.js");
const leveling = require('discord-leveling');

module.exports.run = async (client, message, args) => {

    leveling.Leaderboard({
        limit: 3 //Only takes top 3 ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.users.fetch(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.users.fetch(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.users.fetch(users[2].userid) //Searches for the user object in discord for third place
 
        message.channel.send(`My leaderboard:
 
          1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].level || 'None'} : ${users[0] && users[0].xp || 'None'}
          2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].level || 'None'} : ${users[1] && users[1].xp || 'None'}
          3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].level || 'None'} : ${users[2] && users[2].xp || 'None'}`)
 
      })

}

module.exports.help = {
    name: 'leaderboard'
};