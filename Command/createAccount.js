const Discord = require('discord.js');
const mysql = require('mysql');
const fs = require('fs');
const { parse } = require('path');
const { info } = require('console');

module.exports.run = (client, message) => {

    message.delete();

    const channel = client.channels.cache.get(748223617665466448);

    // iduser contient l'ID discord de l'utilisateur qui a envoyé le message
    let iduser = message.author.id;

    fs.readFile('config.json', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data)
        var connection = mysql.createConnection({
            host: parsedData[0]['ip'],
            user : parsedData[0]['user'],
            password: parsedData[0]['password'],
            database: parsedData[0]['database'],
        });
        //Connexion a la BDD
        connection.connect(console.log("Connexion Réussi"));
    
        connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
            if(error){
                console.log(error);
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
    });
}


module.exports.help = {
    name: 'createaccount'
};