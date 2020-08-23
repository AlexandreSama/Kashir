const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!deletequest ";

    //On récupère le message et on découpe le commandName
    let messages = message.content.substring(commandName.length);
    //On transforme en nombre le String
    let number = Number(messages)

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
    connection.query(`DELETE FROM quests WHERE id = ${number}`, function(error, results) {
        //Si erreurs
        if (error){
            //On envoie un message d'erreur
            console.log(error)
            message.channel.send("Erreur, vérifier l'id que vous avez indiqué")
        //Si résultats
        }if(results){
            //On envoie un message de succés
            message.channel.send("Quête supprimé !")
        }
    });

    //Fermeture de connexion
    connection.end();
}

module.exports.help = {
    name: 'deletequest'
};