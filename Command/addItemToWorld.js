const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //Suppression du message de l'utilisateur
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!additemtoworld ";

    //On découpe le message en enlevant le nom de la commande et ne splitant a chaque |
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

    //On écris des données dans la BDD
    connection.query(`INSERT INTO items (name, description) VALUES ("${messageArray[0]}", "${messageArray[1]}")`, function(error, result) {
        if(error){
            // Je met un console.log le temps de trouver une solution pour les logs et j'envoi un message
            console.log(error);
            message.channel.send("Erreur, veuillez vérifier le nom et/ou la description de l'item");
            connection.end();
        }
        if(result){
            //J'envoi un message et je ferme la connexion
            message.channel.send("Item enregistré avec succés !")
            connection.end();
        }
    })

}

module.exports.help = {
    name: 'additemtoworld'
};