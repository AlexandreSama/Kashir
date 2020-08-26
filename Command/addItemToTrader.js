const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    //Suppression du message de l'utilisateur
    message.delete();

     // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
     const commandName = "!additemtotrader ";

     const channel = client.channels.cache.get(748223617665466448);

     let messageArray = message.content.substring(commandName.length).split(" | ");
 
     //Variable de connexion a la BDD
     var connection = mysql.createConnection({
         host: config.ip,
         user : config.user,
         password: config.password,
         database: config.database,
     });

     //Connexion a la BDD
     connection.connect(console.log("Connexion Réussi"));

     connection.query(`INSERT INTO ${messageArray[0]} (item, price) VALUES ("${messageArray[1]}", "${messageArray[2]}")`, function(error, result) {
         if(error){
            channel.send(error);
             message.channel.send("Erreur, impossible de trouver ce marchant ou vérifier le nom et/ou le prix de l'item");
         }
         if(result){
             message.channel.send("Item ajouté avec succés !")
         }
     })
}

module.exports.help = {
    name: 'additemtotrader'
};