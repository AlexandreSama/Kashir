const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    //Suppression du message de l'utilisateur
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!additemtoworld ";

    const channel = client.channels.cache.get(748223617665466448);

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

    connection.query(`INSERT INTO items (name, description) VALUES ("${messageArray[0]}", "${messageArray[1]}")`, function(error, result) {
        if(error){
            channel.send('<content>');
            message.channel.send("Erreur, veuillez vérifier le nom et/ou la description de l'item");
        }
        if(result){
            message.channel.send("Item enregistré !")
        }
    })

}

module.exports.help = {
    name: 'additemtoworld'
};