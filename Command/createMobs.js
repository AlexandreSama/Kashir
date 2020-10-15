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

    if(message.attachments.first()){//checks if an attachment is sent
        if(msg.attachments.first().filename === `png`){//Download only png (customize this)
            download(msg.attachments.first().url);//Function I will show later
        }
    }

    let config = '../config.json'
 
     //Variable de connexion a la BDD
     var connection = mysql.createConnection({
         host: config.ip,
         user : config.user,
         password: config.password,
         database: config.database,
     });

     //Connexion a la BDD
     connection.connect(console.log("Connexion Réussi"));
}

module.exports.help = {
    name: 'createmobs'
};