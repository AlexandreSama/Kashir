const Discord = require('discord.js');
const request = require('request');

module.exports.run = (client, message) => {

    message.delete();

    const embed = new Discord.MessageEmbed()
    .setColor("#5361ad")
    .setTitle('Infos Covid-19 France')
    .setAuthor('Alexandre')
	.setDescription('Les dernières statistiques du Covid-19 en France')

    request('https://coronavirusapi-france.now.sh/FranceLiveGlobalData', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        embed.addFields(
            { name: 'Date des informations', value: body['FranceGlobalLiveData'][0]['date']},
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
    name: 'covid'
}
