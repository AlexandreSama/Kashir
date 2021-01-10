const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //Suppression du message de l'utilisateur
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!validquest ";

    // on retire le commandName du message et on découpe chaque String a chaque |
    let messageArray = message.content.substring(commandName.length).split(" ");

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
    connection.query(`SELECT recompense FROM quests WHERE id = ${messageArray[0]}`, function(error, results) {
        //Si erreurs
        if(error){
            // Je met un console.log le temps de trouver une solution pour les logs
            console.log(error);
        }
        //Si Résultats
        if (results) {
            var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            //Une autre requête SQL est envoyé pour augmenter ou baisser la quantité d'argent d'un joueur
            connection.query(`UPDATE bank SET money = ${finalData[0].recompense} WHERE idaccount = "${messageArray[1]}"`, function (errors, result) {
                //Si erreurs
                if(errors) {
                    // Je met un console.log le temps de trouver une solution pour les logs
                    console.log(errors);
                    // On ferme la connexion
                    connection.end();
                    message.author.send("Erreur, vérifier votre ID de quête ou l'id du joueur");
                }
                //Si Résultats
                if(result){
                    message.author.send("Récompense transféré avec succés !")
                    // On ferme la connexion
                    connection.end();
                }
            })
        }
    })
}

module.exports.help = {
    name: 'validquest'
};