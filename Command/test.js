const Discord = require('discord.js');

module.exports.run = (client, message) => {
    
    let test = message.mentions.members.first();
    let test2 = test.joinedAt()
    console.log(test2)
}

module.exports.help = {
    name: 'test'
};