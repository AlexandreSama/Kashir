const { info } = require('console');
const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    const user = message.author;
    console.log(user.id)
    let fiche = [];

    fs.readFile('config.json', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data)
        let categoryName = parsedData[0]['ficheCategoryName'];
        let category = message.guild.channels.cache.find(cat=> cat.name === categoryName)
        var connection = mysql.createConnection({
            host: parsedData[0]['ip'],
            user : parsedData[0]['user'],
            password: parsedData[0]['password'],
            database: parsedData[0]['database'],
        });

        connection.connect(console.log("Connexion réussi !"))

        message.guild.channels.create("fiche-de-" + user.username, {
            type: 'text',
            parent: category.id
        }).then(() => {
            let speciChannel = "fiche-de-" + user.username.toLowerCase();
            let channel = message.guild.channels.cache.find(channel => channel.name === speciChannel)
            channel.send("Bienvenue <@" + user.id + ">" + "nous allons pouvoir commencer ! Je vais te poser une série de question, et tu va m\'y répondre a chaque fois. C\'est parti !")
            channel.send("Quel est le nom de ton personnage ?")
        });
        client.on('message', message => {
            if (message.author.bot) {
                return;
            }
            let speciChannel = "fiche-de-" + user.username.toLowerCase();
            let channel = message.guild.channels.cache.find(channel => channel.name === speciChannel)
            channel.fetch({limit: 1 }).then(() => {
            let lastMessage = channel.lastMessage;
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                fiche.push(lastMessage.content)
                console.log(fiche)
            }
            if(fiche.length === 1){
                console.log("étape 1 !")
                connection.query(`INSERT INTO fiche (idaccount, nom) VALUES ("${user.id}", "${fiche[0]}")`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant, donne moi son prénom s'il te plait")
                    }
                })
            }
            if(fiche.length === 2){
                console.log("étape 2 !")
                connection.query(`UPDATE fiche
                SET prenom = '${fiche[1]}'
                WHERE idaccount = ${user.id}`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant son sexe je te prie (Masculin ou Féminin)")
                    }
                })
            }
            if(fiche.length === 3){
                console.log("étape 3 !")
                console.log(fiche)
                connection.query(`UPDATE fiche SET sexe = '${fiche[2]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant son age je te prie")
                    }
                })
            }
            if(fiche.length === 4){
                console.log("étape 4 !")
                console.log(fiche)
                connection.query(`UPDATE fiche SET age = '${fiche[3]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant sa race je te prie")
                    }
                })
            }
        })
    })
    
})
}

module.exports.help = {
    name: 'createplug'
}