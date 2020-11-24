const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //Suppression du message de l'utilisateur
    message.delete();

     // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
     const commandName = "!additemtotrader ";

     //On récupère un channel spécifique
     const channel = client.channels.cache.get(748223617665466448);

     //On découpe le message en enlevant le nom de la commande et en splitant a chaque |
     let messageArray = message.content.substring(commandName.length).split(" | ");

     //On spécifique que config est un fichier json
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

     //On écris des données dans une table spécifique
     connection.query(`INSERT INTO ${messageArray[0]} (item, price) VALUES ("${messageArray[1]}", "${messageArray[2]}")`, function(error, result) {
         if(error){
             // Je met un console.log le temps de trouver une solution pour les logs et j'envoi un message
            console.log(error);
            message.channel.send("Erreur, impossible de trouver ce marchant ou vérifier le nom et/ou le prix de l'item");
            connection.end();
         }
         if(result){
             //J'envoi un message pour valider et je ferme la connexion
             message.channel.send("Item ajouté avec succés !")
             connection.end();
         }
     })
}

module.exports.help = {
    name: 'additemtotrader'
};