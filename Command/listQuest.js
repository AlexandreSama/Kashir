const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    //Variable de connexion a la BDD
    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'Kashir'
    });

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

    //Requête SQL envoyé avec récupération des erreurs, du resultat
    connection.query("select * FROM quests", function(error, results){
        //Si erreurs
        if (error) {
            message.channel.send("Erreur, aucune quête disponible")
        //Si résultats
        }if (results) {
            //On rend sous forme de String le résultat
            var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            //Pour chaque donnée du JSON, on envoie un message contenant la(les) quêtes disponibles
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