const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    const commandName = "!deletequest ";

    let messages = message.content.substring(commandName.length);
    let number = Number(messages)
    console.log(number);

    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'Kashir'
    });
    connection.connect(console.log("Connexion Réussi"));

    connection.query(`DELETE FROM quests WHERE id = ${number}`, function(error, results) {
        if (error){
            console.log(error)
            message.channel.send("Erreur, vérifier l'id que vous avez indiqué")
        }if(results){
            message.channel.send("Quête supprimé !")
        }
    });

    connection.end();
}

module.exports.help = {
    name: 'deletequest'
};