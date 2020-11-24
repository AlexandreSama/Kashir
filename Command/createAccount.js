const Discord = require('discord.js');
const mysql = require('mysql');
const fs = require('fs');
const { parse } = require('path');
const { info } = require('console');

module.exports.run = (client, message) => {

    //On supprime le message
    message.delete();

    //Ici on récupère le channel demandé
    const channel = client.channels.cache.get(748223617665466448);

    // iduser contient l'ID discord de l'utilisateur qui a envoyé le message
    let iduser = message.author.id;

    //On lit un fichier spécifique
    fs.readFile('config.json', (err, data) => {
        //Si erreur, on lance l'erreur dans la console
        if (err) throw err;
        //On parse les données afin de les lirent correctement
        let parsedData = JSON.parse(data)
        //Puis on se connecte a la BDD
        var connection = mysql.createConnection({
            host: parsedData[0]['ip'],
            user : parsedData[0]['user'],
            password: parsedData[0]['password'],
            database: parsedData[0]['database'],
        });
        //Connexion a la BDD
        connection.connect(console.log("Connexion Réussi"));
    
        //On demande des informations spécifiques a la BDD
        connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
            if(error){
                // Je met un console.log le temps de trouver une solution pour les logs
                console.log(error);
            }if (result.length > 0) {
                //S'il y a déjà un compte pour cet personne, on ferme la connexion et on envoi un message
                    connection.end();
                    message.channel.send("Erreur, vous avez déjà un compte lié a votre compte Discord !")
            }if (result.length === 0) {
                //S'il n'y a pas de compte, on crée le compte dans la BDD et on envoi un message
                    connection.query(`INSERT INTO bank (idaccount, money) VALUES ("${iduser}", "0")`)
                    message.channel.send("Compte crée avec succés")
                    connection.end();
            }
        }) 
    });
}


module.exports.help = {
    name: 'createaccount'
};