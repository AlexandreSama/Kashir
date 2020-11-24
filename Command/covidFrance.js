const Discord = require('discord.js');
const request = require('request');

module.exports.run = (client, message) => {

    //On supprime le message
    message.delete();

    //On récupère les infos de l'utilisateur
    let user = message.author;

    //On crée un embed avec toutes les infos nécessaires
    const embed = new Discord.MessageEmbed()
    .setColor("#0000FF")
    .setTitle('Infos Covid-19 France')
    .setAuthor(user.username)
	.setDescription('Les dernières statistiques du Covid-19 en France')

    //On crée une requête a une api spécifique et on insère les données dans l'embed avant de l'envoyer
    request('https://coronavirusapi-france.now.sh/FranceLiveGlobalData', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        embed.addFields(
            { name: 'Date des informations', value: body['FranceGlobalLiveData'][0]['date']},
            { name: 'Notes', value: ' les données sont actualisées chaque jours aux alentours de 20h donc si vous faites cet commande avant 20h vous aurez les données du jour d\'avant'},
            { name: 'Nombre de décés (Hopitaux + Hors-Hopitaux)', value: body['FranceGlobalLiveData'][0]['deces'] },
            { name: 'Nombre de décés en Ehpad', value: body['FranceGlobalLiveData'][0]['decesEhpad']},
            { name: 'Nombre de patients guéris', value: body['FranceGlobalLiveData'][0]['gueris']},
            { name: 'Nombre de patients hospitalisés', value: body['FranceGlobalLiveData'][0]['hospitalises']},
            { name: 'Nombre de patients en réanimations', value: body['FranceGlobalLiveData'][0]['reanimation']},
            { name: 'Nombre de nouvelles Hospitalisations', value: body['FranceGlobalLiveData'][0]['nouvellesHospitalisations']},
            { name: 'Nombre de nouvelles réanimations', value: body['FranceGlobalLiveData'][0]['nouvellesReanimations']},
            { name: 'Source', value: body['FranceGlobalLiveData'][0]['source']['nom']}
        )
        embed.setTimestamp();
        message.channel.send(embed)
    });

}

module.exports.help = {
    name: 'covidFrance'
}
