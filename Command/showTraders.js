const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //Suppression du message de l'utilisateur
    message.delete();

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

    // On séléctionne le nom de chaque Trader dans la Table traders
    connection.query(`SELECT name FROM traders`, function(error, result) {
        if(error){
            // Je met un console.log le temps de trouver une solution pour les logs
            console.log(error);
            //On envoi un message d'erreur
            message.channel.send("Erreur, veuillez contacter votre Administrateur !")
        }
        if(result){
            console.log(result);
            //On rend sous forme de String le résultat
            var data = JSON.stringify(result)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            //Pour chaque string, on envoi un message en DM a l'auteur de la commande avec le nom du Trader
            finalData.forEach(function(data, index) {
                message.author.send(`- nom : ${data.name}` )
            })
        }
    })

}

module.exports.help = {
    name: 'showtraders'
};