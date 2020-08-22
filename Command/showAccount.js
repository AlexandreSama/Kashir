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

    connection.query(`SELECT money FROM bank WHERE idaccount = ${iduser}`, function(error, result) {
        if (error) {
            message.channel.send("Désolé, vous n'avez pas de compte a votre actif !")
        }if (result) {
            console.log(result)
            //On rend sous forme de String le résultat
            var data = JSON.stringify(result)
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data)
            message.channel.send(`Vous avez actuellement : ${finalData[0].money} pièces !`)
        }
    })

}

module.exports.help = {
    name: 'showaccount'
};