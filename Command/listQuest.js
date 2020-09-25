const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message) => {
    //Suppression du message de l'utilisateur
    message.delete();

    const channel = client.channels.cache.get(748223617665466448);

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
    connection.query("select * FROM quests", function(error, results){
        //Si erreurs
        if (error) {
            console.log(error);
            message.channel.send("Il n'y a aucune quête pour aujourd'hui malheureusement")
        //Si résultats
        }if (results) {
            //On rend sous forme de String le résultat
            var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            //Pour chaque donnée du JSON, on envoie un message contenant la(les) quêtes disponibles
            console.log(finalData)
            finalData.forEach(function(data, index) {
                message.channel.send(`- id : ${data.id} \n - nom : ${data.nom} \n - description : ${data.description} \n - récompense : ${data.recompense}` )
            })
        }
    });

    //Fermeture de la connexion
    connection.end();

}

module.exports.help = {
    name: 'listquest'
};