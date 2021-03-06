const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {
    //Suppression du message de l'utilisateur
    message.delete();

    // iduser contient l'ID discord de l'utilisateur qui a envoyé le message
    let iduser = message.author.id;


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

    //Requête SQL envoyé avec récupération des erreurs, du resultat
    connection.query(`SELECT money FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
        //Si erreur
        if (error) {
            // Je met un console.log le temps de trouver une solution pour les logs
            console.log(error);
            message.channel.send("Désolé, vous n'avez pas de compte a votre actif !")
        }
        //Si résultat
        if (result) {
            //On rend sous forme de String le résultat
            var data = JSON.stringify(result)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            //On envoie un message en DM a l'auteur de la commande
            message.author.send(`Vous avez actuellement : ${finalData[0].money} pièces !`)
        }
    })
}

module.exports.help = {
    name: 'showaccount'
};