const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');

module.exports.run = (client, message) => {

    message.delete();

    const options = {
        url: 'https://api.github.com/repos/AlexandreSama/Kashir',
        headers: {
          'User-Agent': 'AlexandreSama'
        }
      };

    request("https://api.github.com/repos/AlexandreSama/Kashir/commits", { json: true , headers: {
        'User-Agent': 'AlexandreSama'
    } }, (err, res, body) => {
        if (err) { console.log(err); }
        console.log(body)
        fs.readFile('commit.json', (err, data) => {
            if(err){
                let data = JSON.stringify(body[0]['commit']['author']['date'])
                fs.writeFile('commit.json', data)
            }
            let parsedData = JSON.parse(data);
            if(parsedData[0] != body[0]['commit']['author']['date']){
                message.channel.send(":warning: J'ai été mis a jour ! Voici les nouvelles modifications : \n" + body[0]['commit']['message']);
            }
        })
    });
}

module.exports.help = {
    name: 'update'
}