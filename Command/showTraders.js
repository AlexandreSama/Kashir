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

    connection.query(`SELECT name FROM traders`, function(error, result) {
        if(error){
            console.log(error);
            message.channel.send("Erreur, veuillez contacter votre Administrateur !")
        }
        if(result){
            console.log(result);
            //On rend sous forme de String le résultat
            var data = JSON.stringify(result)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            finalData.forEach(function(data, index) {
                message.author.send(`- nom : ${data.name}` )
            })
        }
    })

}

module.exports.help = {
    name: 'showtraders'
};