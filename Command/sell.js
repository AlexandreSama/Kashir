const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!sell ";

    let messageArray = message.content.substring(commandName.length).split(" | ");
    console.log(messageArray)

    //Variable de connexion a la BDD
    var connection = mysql.createConnection({
        host: config.ip,
        user : config.user,
        password: config.password,
        database: config.database,
    });

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

    connection.query(`SELECT price FROM ${messageArray[0]} WHERE item = ${messageArray[1]}`, function(result, error) {
        if(error){
            connection.end();
            message.author.send("Désolé, mais vous n'avez pas cet item sur vous !")
        }if(result){
            console.log(result)
        }
    })
}

module.exports.help = {
    name: 'sell'
};