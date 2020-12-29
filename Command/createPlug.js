const { info } = require('console');
const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    //On récupère les infos de l'utilisateur
    const user = message.author;
    //On crée un tableau vide
    let fiche = [];

    //On va lire un fichier spécifique
    fs.readFile('config.json', (err, data) => {
        //Si erreur, on lance l'erreur dans la console
        if (err) throw err;
        //On parse les données du fichier
        let parsedData = JSON.parse(data)
        //On récupère le nom de la catégorie pour les fiches
        let categoryFicheName = parsedData[0]['ficheCategoryName'];
        //On cherche la catégorie pour les fiches sur le serveur
        let categoryFiche = message.guild.channels.cache.find(cat=> cat.name === categoryFicheName)
        //Et ici on se connecte a MySQL
        var connection = mysql.createConnection({
            host: parsedData[0]['ip'],
            user : parsedData[0]['user'],
            password: parsedData[0]['password'],
            database: parsedData[0]['database'],
        });

        //Connexion a la BDD
        connection.connect(console.log("Connexion réussi !"))

        //Création du channel spécifique a l'Utilisateur
        message.guild.channels.create("fiche-de-" + user.username, {
            type: 'text',
            parent: categoryFiche.id
            //Ensuite on envoi un message pour ping l'Utilisateur et lui poser les questions
        }).then(() => {
            let speciChannel = "fiche-de-" + user.username.toLowerCase();
            let channel = message.guild.channels.cache.find(channel => channel.name === speciChannel)
            channel.send("Bienvenue <@" + user.id + ">" + "nous allons pouvoir commencer ! Je vais te poser une série de question, et tu va m\'y répondre a chaque fois. C\'est parti !")
            channel.send("Quel est le nom de ton personnage ?")
        });
        //Si un message est envoyé dans ce channel
        client.on('message', message => {
            if (message.author.bot) {
                return;
            }
            //On get le channel spécifié
            let speciChannel = "fiche-de-" + user.username.toLowerCase();
            let channel = message.guild.channels.cache.find(channel => channel.name === speciChannel)
            channel.fetch({limit: 1 }).then(() => {
            let lastMessage = channel.lastMessage;
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                fiche.push(lastMessage.content)
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
                connection.query(`UPDATE fiche SET age = '${fiche[3]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant sa race je te prie")
                    }
                })
            }
            if(fiche.length === 5){
                console.log("étape 5 !")
                connection.query(`UPDATE fiche SET race = '${fiche[4]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant, décris moi son physique s'il te plait (pas plus de 2000 caractères !)")
                    }
                })
            }
            if(fiche.length === 6){
                console.log("étape 6 !")
                connection.query(`UPDATE fiche SET physique = '${fiche[5]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant, décris moi son caractère s'il te plait (toujours pas plus de 2000 caractères !)")
                    }
                })
            }
            if(fiche.length === 7){
                console.log("étape 7 !")
                connection.query(`UPDATE fiche SET mental = '${fiche[6]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Ok ! Maintenant, décris moi son pouvoir s'il te plait (toujours pas plus de 2000 caractères !)")
                    }
                })
            }
            if(fiche.length === 8){
                console.log("étape 8 !")
                connection.query(`UPDATE fiche SET pouvoirs = '${fiche[7]}' WHERE idaccount = "${user.id}"`, function (error, result) {
                    if(error){
                        console.log(error)
                    }
                    if(result){
                        channel.send("Parfait ! Ta candidature a été sauvegardé et a été envoyé aux modérateurs, ils viendrons vers toi rapidement !")
                        let categoryStaffName = parsedData[0]['staffCategoryName'];
                        let categoryStaff = message.guild.channels.cache.find(cat=> cat.name === categoryStaffName)
                        let speciChannel = "fiche-a-valider";
                        let channelStaff = message.guild.channels.cache.find(channel => channel.name === speciChannel)
                        console.log(channelStaff)
                        if(channelStaff === undefined){
                            message.guild.channels.create("fiche-a-valider", {
                                type: 'text',
                                parent: categoryStaff.id
                            }).then(() => {
                                connection.query(`SELECT * FROM fiche WHERE idaccount = ${user.id}`, function (error, result) {
                                    if(error){
                                        message.channel.send(error)
                                    }
                                    if(result){
                                        let speciChannelBefore = "fiche-a-valider";
                                        let channelStaffAfter = message.guild.channels.cache.find(channel => channel.name === speciChannelBefore)
                                        var data = JSON.stringify(result)
                                        //On rend sous forme de JSON la var data
                                        var finalData = JSON.parse(data)
                                        console.log(finalData)
                                        //Puis on envois tout dans le channel réservé aux staff !
                                        channelStaffAfter.send("Fiche de "+ user.username)
                                        channelStaffAfter.send("nom : " + finalData[0].nom)
                                        channelStaffAfter.send("prénom : " + finalData[0].prenom)
                                        channelStaffAfter.send("Age : " + finalData[0].age)
                                        channelStaffAfter.send("Description Physique : " + finalData[0].physique)
                                        channelStaffAfter.send("Description Mental : " + finalData[0].mental)
                                        channelStaffAfter.send("Description de son Pouvoir : " + finalData[0].pouvoirs)
                                        connection.end();
                                    }
                                })
                            });
                        }else{
                            connection.query(`SELECT * FROM fiche WHERE idaccount = ${user.id}`, function (error, result) {
                                if(error){
                                    message.channel.send(error)
                                }
                                if(result){
                                    var data = JSON.stringify(result)
                                    //On rend sous forme de JSON la var data
                                    var finalData = JSON.parse(data)
                                    console.log(finalData)
                                    let speciChannelStaff = "fiche-a-valider";
                                    let channelStaffAfter = message.guild.channels.cache.find(channel => channel.name === speciChannelStaff)
                                    //Puis on envois tout dans le channel réservé aux staff !
                                    channelStaffAfter.send("Fiche de "+ user.username)
                                    channelStaffAfter.send("nom : " + finalData[0].nom)
                                    channelStaffAfter.send("prénom : " + finalData[0].prenom)
                                    channelStaffAfter.send("Age : " + finalData[0].age)
                                    channelStaffAfter.send("Description Physique : " + finalData[0].physique)
                                    channelStaffAfter.send("Description Mental : " + finalData[0].mental)
                                    channelStaffAfter.send("Description de son Pouvoir : " + finalData[0].pouvoirs)
                                    connection.end();
                                }
                            })
                        }
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