const Discord = require('discord.js');
const fs = require('fs');
const request = require(`request`);
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();

    let user = message.author;
    const commandName = "!createdatabase ";
    let config = '../config.json'
    let category = config.ficheCategoryName;

    var connection = mysql.createConnection({
        host: config.ip,
        user : config.user,
        password: config.password,
        database: config.database,
    });

    connection.connect(console.log("Connexion Réussi"));

    message.guild.channels.create("Fiche de " + user, {
        type: 'text',
    })

};

module.exports.help = {
    name: 'createPlug'
};