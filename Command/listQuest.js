const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'Kashir'
    });

    connection.connect(console.log("Connexion Réussi"));

    connection.query("select * FROM quests", function(error, results, fields){
        if (error) {
            console.log(error)
        }if (results) {
            //console.log(results[0])
            var data = JSON.stringify(results)
            var finalData = JSON.parse(data)
            finalData.forEach(function(data, index) {
                message.channel.send(`- id : ${data.id} \n - nom : ${data.nom} \n - description : ${data.description} \n - récompense : ${data.recompense}` )
            })
            console.log(finalData)
        }
    });

    connection.end();

}

module.exports.help = {
    name: 'listquest'
};