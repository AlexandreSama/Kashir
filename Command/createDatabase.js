const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();
    const commandName = "!createdatabase ";

    let messageArray = message.content.substring(commandName.length).split(" | ");

    let infos = [];

    infos.push({ip: messageArray[0], user: messageArray[1], password: messageArray[2], database: messageArray[3] })

    let data = JSON.stringify(infos);
    fs.writeFileSync('config.json', data);

    // Variable de connexion a la BDD
    if (infos[0]['password'].length <= 0) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
        })
        console.log("ici sans mot de passe")
    }else if (infos[0]['password'].length > 0) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
            password: `${messageArray[2]}`,
        })
        console.log("ici avec mot de passe")
    }

    //Connexion a la BDD
    connection.connect(function(err, res) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
    })

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