const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();

    let config = [];

    message.channel.send("On va commencer la configuration du bot !");

    message.channel.send("Peut-tu me donner l'adresse (ip) de la Base de Données ?");

        if (message.author.bot) {
            return;
        }
        let lastMessage = message.channel.lastMessage;
        if(lastMessage.author.bot === true){
            console.log("ok")
        }else {
            config.push(lastMessage.content)
            message.channel.send("Maintenant, donne moi le nom d'utilisateur de la Base De Données !");
        }
        if(config.length === 1){
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                config.push(lastMessage.content)
                message.channel.send("Maintenant, donne moi le mot de passe de la Base De Données !");
            }
        }
        if(config.length === 2){
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                config.push(lastMessage.content)
                message.channel.send("Maintenant, donne moi le nom de la Base De Données !");
            }
        }
        if(config.length === 3){
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                config.push(lastMessage.content)
                message.channel.send("Maintenant, donne moi le nom du channel de bienvenue et de leave !");
            }
        }
        if(config.length === 4){
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                config.push(lastMessage.content)
                message.channel.send("Maintenant, donne moi le nom de la catégorie ou seront les fiches en attentes !");
            }
        }
        if(config.length === 5){
            if(lastMessage.author.bot === true){
                console.log("ok")
            }else {
                config.push(lastMessage.content)
                message.channel.send("Voila ! Je suis parfaitement configuré ! C'étais rapide !")
                let datas = JSON.stringify(config);
                fs.writeFile("conf.json", datas, (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                });
            }
        }

}

module.exports.help = {
    name: 'config'
};