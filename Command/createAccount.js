const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    message.delete();

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

    connection.query(`SELECT * FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
        if(error){
            console.log(error)
        }
        if (result) {
            console.log(result)
        }if (result.length > 0) {
                connection.end();
                message.channel.send("Erreur, vous avez déjà un compte a votre nom !")
        }if (result.length === 0) {
                connection.query(`INSERT INTO bank (idaccount, money) VALUES ("${iduser}", "0")`)
                message.channel.send("Compte crée avec succés")
        }
    }) 
}


module.exports.help = {
    name: 'createaccount'
};