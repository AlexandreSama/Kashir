const Discord = require('discord.js');
const fs = require('fs');
const request = require(`request`);
const mysql = require('mysql');

module.exports.run = (client, message) => {

    var attachment = (message.attachments).array();

    request.get(attachment.url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(`Img-${Date.now()}`));

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