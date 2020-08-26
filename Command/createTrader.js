const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    //Suppression du message de l'utilisateur
    message.delete();

     // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
     const commandName = "!createtrader ";

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

     connection.query(`CREATE TABLE ${messageArray[0]} (ID INT NOT NULL AUTO_INCREMENT , item TEXT NOT NULL, price INT NOT NULL, funds BIGINT NOT NULL, PRIMARY KEY (ID))`, function(error, result){
        if(error){
            connection.end();
            channel.send('<content>');
            message.channel.send("Erreur, un marchand est déjà crée avec ce nom, ou vérifier le nom que vous avez entrée")
        }
        if(result){
            connection.query(`INSERT INTO traders (name) VALUES ("${messageArray[0]}")`)
            message.channel.send("Marchand Enregistré, bon troc !")
        }
     })
}

module.exports.help = {
    name: 'createtrader'
};