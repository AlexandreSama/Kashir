const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete();
    const embed = new Discord.MessageEmbed()
    .setColor("#5361ad")
    .setTitle('Panneau des commandes')
    .setURL('https://github.com/AlexandreSama/Kashir#readme')
    .setAuthor('Alexandre', 'https://i.imgur.com/wSTFkRM.png', 'https://github.com/AlexandreSama/Kashir#readme')
	.setDescription('Toute les infos sur les commandes du bot')
	.addFields(
		{ name: '!help', value: 'Donne l\'accés au panneau d\'information' },
		{ name: '!cquest', value: 'Exemple : !cquest nom | description | recompense (en chiffre,sans espace n\'y texte)'},
		{ name: '!deletequest', value: 'Exemple : !deletequest iddelaquete'},
        { name: '!listquest', value: 'Donne la liste des quêtes disponibles'},
        { name: '!showaccount', value: 'Donne un apercu de la somme que vous avez sur vous ou dans votre banque'},
        { name: '!createaccount', value: 'Vous crée un compte bancaire'})
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
    .setFooter('Made With Love By Alexandre', 'https://i.imgur.com/wSTFkRM.png');
    
    message.channel.send(embed);

}

module.exports.help = {
    name: 'help'
};