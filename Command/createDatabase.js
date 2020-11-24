const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //On supprime le message
    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!createdatabase ";

    // on retire le commandName du message et on découpe chaque String a chaque |
    let messageArray = message.content.substring(commandName.length).split(" | ");

    // On crée un array vide
    let infos = [];

    //On push dans le tableau les infos que l'on veut
    infos.push({ip: messageArray[0], user: messageArray[1], password: messageArray[2], database: messageArray[3] })

    //On rend le tableau sous forme de JSON et on crée un fichier avec le tableau dedans
    let data = JSON.stringify(infos);
    fs.writeFileSync('config.json', data);

    // Variable de connexion a la BDD
    if (infos[0]['password'].length <= 0) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
        })
    }else if (infos[0]['password'].length > 0) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
            password: `${messageArray[2]}`,
        })
    }

    //Connexion a la BDD
    connection.connect(function(err, res) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
    })

    //Ici on crée tout les tables et la base de données nécessaires (ce qui peut être long et fastidieux quand on y pense)
    connection.query(`CREATE DATABASE ${messageArray[3]};`, function(error, result){
        if(error){
            connection.end();
            console.log(error);
        }if(result){
            connection.query(`USE ${messageArray[3]};`, function(error, result){
        if(error){
            connection.end();
            console.log(error);
        }if(result){
            connection.query(`CREATE TABLE items (ID INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, description TEXT NOT NULL, PRIMARY KEY (ID));`, function(error, result){
        if(error){
            connection.end();
            console.log(error);
        }if(result){
            connection.query(`CREATE TABLE bank (ID INT NOT NULL AUTO_INCREMENT, idaccount INT NOT NULL, money INT, PRIMARY KEY (ID));`, function(error, result){
        if(error){
            connection.end();
            console.log(error);
        }if(result){
            connection.query(`CREATE TABLE quests (ID INT NOT NULL AUTO_INCREMENT, nom VARCHAR(200) NOT NULL, description TEXT NOT NULL, recompense TEXT NOT NULL, PRIMARY KEY (ID))`, function(error, result){
        if(error){
            connection.end();
            message.channel.send(error)
        }if(result){
            connection.query(`CREATE TABLE fiche (ID INT NOT NULL AUTO_INCREMENT, idaccount BIGINT NOT NULL, nom VARCHAR(200) NOT NULL, prenom VARCHAR(200) NOT NULL, sexe VARCHAR(200) NOT NULL, age INT NOT NULL, race VARCHAR(200) NOT NULL, physique TEXT NOT NULL, mental TEXT NOT NULL, pouvoirs INT NOT NULL, PRIMARY KEY (ID))`, function(error, result){
        if(error){
            connection.end();
            console.log(error)
            message.channel.send('Erreur ! Veuillez contacter votre administrateur')
        }if(result){
            console.log("yes !")
            message.channel.send("Base de Donnée crée avec succés")
        }})
        }})
        }})
        }})
        }})
        }})
}

module.exports.help = {
    name: 'createdatabase'
};