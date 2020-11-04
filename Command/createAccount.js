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

    let infos = []

    fs.readFile('config.json', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data)
        console.log(parsedData)
        infos.push({id: parsedData['table'][0]['ip'], user: parsedData['table'][0]['user'], password: parsedData['table'][0]['password']})
    });

    console.log(infos)


    //Variable de connexion a la BDD
    // var connection = mysql.createConnection({
    //     host: infos[0]['ip'],
    //     user : infos[0]['user'],
    //     password: infos[0]['password'],
    //     database: infos[0]['database'],
    // });

    // //Connexion a la BDD
    // connection.connect(console.log("Connexion Réussi"));

    // connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
    //     if(error){
    //         console.log(error);
    //     }
    //     if (result) {
    //         console.log(result)
    //     }if (result.length > 0) {
    //             connection.end();
    //             message.channel.send("Erreur, vous avez déjà un compte lié a votre compte Discord !")
    //     }if (result.length === 0) {
    //             connection.query(`INSERT INTO bank (idaccount, money) VALUES ("${iduser}", "0")`)
    //             message.channel.send("Compte crée avec succés")
    //     }
    // }) 
}


module.exports.help = {
    name: 'createaccount'
};