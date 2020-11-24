const Discord = require('discord.js');
const request = require('request');

module.exports.run = (client, message) => {

    //On supprime le message
    message.delete();

    //On récupère les infos de l'utilisateur
    let user = message.author;
    //On spécifie que la commande est "!covid"
    const commandName = "!covid ";

    //On découpe le message en enlevant le nom de la commande pour garder le département
    let messageArray = message.content.substring(commandName.length).split(" ");

    //On crée un embed
    const embed = new Discord.MessageEmbed()
    .setColor("#0000FF")
    .setAuthor(user.username)
    
    //On crée une requête a une api spécifique et on insère les données dans l'embed avant de l'envoyer
    request('https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=' + messageArray[0], { json: true }, (err, res, body) => {
        if (err) { message.channel.send('Vérifie le département que tu m\'a donné, je ne le trouve pas'); }
        console.log(body)
        embed.addFields(
            { name: 'Nom du Département', value: body['LiveDataByDepartement'][0]['nom']},
            { name: 'Date des informations', value: body['LiveDataByDepartement'][0]['date']},
            { name: 'Notes', value: ' les données sont actualisées chaque jours aux alentours de 20h donc si vous faites cet commande avant 20h vous aurez les données du jour d\'avant'},
            { name: 'Nombre de décés (Hopitaux + Hors-Hopitaux)', value: body['LiveDataByDepartement'][0]['deces'] },
            { name: 'Nombre de patients guéris', value: body['LiveDataByDepartement'][0]['gueris']},
            { name: 'Nombre de patients hospitalisés', value: body['LiveDataByDepartement'][0]['hospitalises']},
            { name: 'Nombre de patients en réanimations', value: body['LiveDataByDepartement'][0]['reanimation']},
            { name: 'Nombre de nouvelles Hospitalisations', value: body['LiveDataByDepartement'][0]['nouvellesHospitalisations']},
            { name: 'Nombre de nouvelles réanimations', value: body['LiveDataByDepartement'][0]['nouvellesReanimations']},
            { name: 'Source', value: body['LiveDataByDepartement'][0]['source']['nom']}
        )
        embed.setTitle('Infos Covid-19 dans le Département ' + messageArray[0])
        embed.setDescription('Les dernières statistiques du Covid-19 dans le Département ' + messageArray[0])
        embed.setTimestamp();
        message.channel.send(embed)
    });

}

module.exports.help = {
    name: 'covid'
}