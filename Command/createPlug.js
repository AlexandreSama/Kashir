const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();

    let user = message.author;

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
        //Connexion a la BDD
        connection.connect(console.log("Connexion Réussi"));
        let channel = message.guild.channels.cache.find(channel => channel.name === 'fiche-de-' + user.username.toLowerCase())

        message.guild.channels.create("fiche-de-" + user.username, {
            type: 'text',
            parent: category.id
        }).then((value) => {
            channel.send("Bienvenue <@" + user.id + ">" + " dans ton Salon ! Je suis a toi dans un instant !")
        });
});

}

module.exports.help = {
    name: 'createplug'
}