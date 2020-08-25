const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {
    //Suppression du message de l'utilisateur
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!cquest ";

    // on retire le commandName du message et on découpe chaque String a chaque |
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

    //Requête SQL envoyé avec récupération des erreurs, du resultat
    connection.query(`INSERT INTO quests (nom, description, recompense) VALUES ("${messageArray[0]}","${messageArray[1]}","${messageArray[2]}")`, function(error, results) {
        //Si erreurs
        if (error) {
            console.log(error)
            //Envoi d'un message d'erreur
            message.channel.send("Erreur, vérifier bien votre message !")
            return;
        }
        //Si Résultat
        if (results) {
            //Envoi d'un message de succés
            message.channel.send("Quète Enregistré !")
            return;
        }
    });

    //Fermeture de la connexion
    connection.end();

}

module.exports.help = {
    name: 'cquest'
};