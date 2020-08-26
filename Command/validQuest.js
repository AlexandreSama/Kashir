const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    //Suppression du message de l'utilisateur
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!validquest ";

    const channel = client.channels.cache.get(748223617665466448);

    // on retire le commandName du message et on découpe chaque String a chaque |
    let messageArray = message.content.substring(commandName.length).split(" ");

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
    connection.query(`SELECT recompense FROM quests WHERE id = ${messageArray[0]}`, function(error, results) {
        //Si erreurs
        if(error){
            channel.send(error);
        }
        //Si Résultats
        if (results) {
            console.log(results)
            var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            console.log(finalData);
            //Une autre requête SQL est envoyé pour augmenter ou baisser la quantité d'argent d'un joueur
            connection.query(`UPDATE bank SET money = ${finalData[0].recompense} WHERE idaccount = "${messageArray[1]}"`, function (errors, result) {
                //Si erreurs
                if(errors) {
                    console.log(errors);
                    connection.end();
                    message.channel.send("Erreur, vérifier votre ID de quête ou l'id du joueur");
                }
                //Si Résultats
                if(result){
                    message.channel.send("Récompense transféré avec succés !")
                }
            })
        }
    })
}

module.exports.help = {
    name: 'validquest'
};