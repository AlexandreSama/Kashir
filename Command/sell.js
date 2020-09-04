const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    // Const pour retenir le nom de la commande (on ajoute un espace a la fin pour ne pas mal découpé le message)
    const commandName = "!sell ";

    let messageArray = message.content.substring(commandName.length).split(" | ");
    console.log(messageArray);

    //Variable de connexion a la BDD
    var connection = mysql.createConnection({
        host: config.ip,
        user : config.user,
        password: config.password,
        database: config.database,
    });

    //Connexion a la BDD
    connection.connect(console.log("Connexion Réussi"));

    connection.query(`SELECT price FROM ${messageArray[0]} WHERE item = "${messageArray[1]}"`, function(error, result) {
        if(error){
            connection.end();
            message.author.send("Désolé, mais vous n'avez pas cet item sur vous !");
            console.log(error);
        }
        if(result){
            //On rend sous forme de String le résultat
            var data = JSON.stringify(result);
            //On rend sous forme de JSON la var data
            var finalData = JSON.parse(data);
            //Pour chaque donnée du JSON, on envoie un message contenant la(les) quêtes disponibles
            var priceofitem = finalData[0]["price"];
            connection.query(`SELECT money FROM bank WHERE idaccount = ${messageArray[2]}`, function(error, result) {
                if(error){
                    connection.end();
                    message.guild.members.cache.get(messageArray[2]).send("Désolé, mais vous n'avez pas assez d'argent pour payer cet item !");
                    console.log(error);
                }
                if(result){
                    //On rend sous forme de String le résultat
                    var data = JSON.stringify(result);
                    //On rend sous forme de JSON la var data
                    var finalData = JSON.parse(data);
                    //Pour chaque donnée du JSON, on envoie un message contenant la(les) quêtes disponibles
                    var money = finalData[0]["money"];
                    var calculout = money - priceofitem;
                    connection.query(`UPDATE bank SET money = ${calculout} WHERE idaccount = ${messageArray[2]}`, function(error, result) {
                        if(error){
                            connection.end();
                            console.log(error);
                            message.guild.members.cache.get(messageArray[2]).send('Argent retiré avec succés');
                        }
                        if(result){
                            connection.query(`SELECT money FROM bank WHERE idaccount = ${message.author.id}`, function(error, result){
                                if(error){
                                    console.log(error);
                                    message.guild.members.cache.get(messageArray[0]).send("Une erreur s'est produite, veuillez contacter votre Administrateur");
                                }
                                if(result){
                                    //On rend sous forme de String le résultat
                                    var data = JSON.stringify(result);
                                    //On rend sous forme de JSON la var data
                                    var finalData = JSON.parse(data);
                                    //Pour chaque donnée du JSON, on envoie un message contenant la(les) quêtes disponibles
                                    var money = finalData[0]["money"];
                                    var calculadd = money + priceofitem;
                                    connection.query(`UPDATE bank SET money = ${calculadd} WHERE idaccount = ${messageArray[]}`)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.help = {
    name: 'sell'
};