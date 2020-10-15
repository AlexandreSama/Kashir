const Discord = require('discord.js');
const fs = require('fs');
const request = require(`request`);
const mysql = require('mysql');

module.exports.run = (client, message) => {

    function download(url){
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('meme.png'));
    }
    
    download(message.attachments.first().url);//Function I will show later
}

module.exports.help = {
    name: 'createmobs'
};