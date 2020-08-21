const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    const commandName = "!cquest "

    let messageArray = message.content.substring(commandName.length).split(" | ");
    console.log(messageArray);

    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'Kashir'
    })
    connection.connect(console.log("Connexion Réussi"));

    connection.query(`INSERT INTO quests (nom, description, recompense) VALUES ("${messageArray[0]}","${messageArray[1]}","${messageArray[2]}")`, function(error, results, fields) {
        if (error) {
            message.channel.send("Erreur, vérifier bien votre message !")
            return;
        }
        if (results) {
            message.channel.send("Quète Enregistré !")
            return;
        }
    })
}

module.exports.help = {
    name: 'cquest'
};