const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message, guild) => {

    message.delete();

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!config ";

    if(message.author.id === client.user.id) return;
    // on retire le commandName du message et on découpe chaque String a chaque |
    let messageArray = message.content.substring(commandName.length).split(" ");

    let guildName = guild.name;

    // On crée un array vide
    let infos = [];

    //On push dans le tableau les infos que l'on veut
    infos.push({ip: messageArray[0], user: messageArray[1], password: messageArray[2], database: guildName, ficheCategoryName: messageArray[3], staffCategoryName: messageArray[4] })

    // Variable de connexion a la BDD
    if (infos[0]['staffCategoryName'] != undefined) {

        if(infos[0]['password'].length <= 0){
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
        })

         //Connexion a la BDD
    connection.connect(function(err, res) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
    })

    //Création de toute la Base de Données et sauvegarde des infos sur le Project Directory !
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
            message.channel.send("Base de Donnée crée avec succés et informations de la BDD save !")
            let data = JSON.stringify(infos);
            fs.writeFileSync('config.json', data);
        }})}})}})}})}})}})

    }else if(infos[0]['password'].length > 0){

        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
            password: `${messageArray[2]}`,
        })

         //Connexion a la BDD
    connection.connect(function(err, res) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
    })

    //Création de toute la Base de Données et sauvegarde des infos sur le Project Directory !
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
            message.channel.send("Base de Donnée crée avec succés et informations de la BDD save !")
            let data = JSON.stringify(infos);
            fs.writeFileSync('config.json', data);
        }})}})}})}})}})}})

    }}else{

        message.channel.send("Il faudrait peut-être ajouter quelque chose dans cet commande ?")

    }

}

module.exports.help = {
    name: 'config'
};