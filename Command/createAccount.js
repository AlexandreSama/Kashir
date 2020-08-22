const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    // iduser contient l'ID discord de l'utilisateur qui a envoyé le message
    let iduser = message.author.id;

    //Variable de connexion a la BDD
    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'Kashir'
    });

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

    var checkAccount = connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`);
    var createAccount = connection.query(`INSERT INTO bank (idaccount, money) VALUES ("${iduser}", "0")`)
    console.log(checkAccount);

    if (checkAccount === 0) {
        createAccount();
        message.channel.send("Compté crée avec succés !")
    }else if (checkAccount > 0) {
        message.channel.send("Désolé, tu a déjà un compte ouvert a cet ID!")
    }

    //Fermeture de connexion
    connection.end();
}


module.exports.help = {
    name: 'createaccount'
};