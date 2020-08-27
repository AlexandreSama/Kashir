const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message) => {

    message.delete();

    const channel = client.channels.cache.get(748223617665466448);

    // iduser contient l'ID discord de l'utilisateur qui a envoyé le message
    let iduser = message.author.id;

    //Variable de connexion a la BDD
    var connection = mysql.createConnection({
        host: config.ip,
        user : config.user,
        password: config.password,
        database: config.database,
    });

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

    connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
        if(error){
            channel.send(error);
        }
        if (result) {
            console.log(result)
        }if (result.length > 0) {
                connection.end();
                message.channel.send("Erreur, vous avez déjà un compte lié a votre compte Discord !")
        }if (result.length === 0) {
                connection.query(`INSERT INTO bank (idaccount, money) VALUES ("${iduser}", "0")`)
                message.channel.send("Compte crée avec succés")
        }
    }) 
}


module.exports.help = {
    name: 'createaccount'
};