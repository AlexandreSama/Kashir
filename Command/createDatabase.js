const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();
    const commandName = "!createdatabase ";

    let messageArray = message.content.substring(commandName.length).split(" | ");

    let infos = { 
        ip: `${messageArray[0]}`,
        user: `${messageArray[1]}`,
        password: `${messageArray[2]}`,
    };
    console.log(infos)

    let infostringified = JSON.stringify(infos, null, 2);

    fs.writeFileSync('config.json', infostringified);

    let config = '../config.json'

    //Variable de connexion a la BDD
    if (config.password == undefined) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
        })
        console.log("ici sans mot de passe")
    }else if (config.password != undefined) {
        var connection = mysql.createConnection({
            host: `${messageArray[0]}`,
            user : `${messageArray[1]}`,
            password: `${messageArray[2]}`,
        })
        console.log("ici avec mot de passe")
    }

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

}

module.exports.help = {
    name: 'createdatabase'
};