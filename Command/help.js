const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    //Suppression du message de l'utilisateur
    message.delete();
    //Création d'un embed dans une constant (car il ne change jamais)
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
        { name: '!createaccount', value: 'Vous crée un compte bancaire'},
        { name: '!additemtotrader', value: 'Ajoute un item dans votre boutique, Exemple: !additemtotrader votrenomdemarchand | nomdelitem | prixdelitem'},
        { name: '!additemtoworld', value: 'Ajoute un item dans votre univers, exemple : !additemtoworld nomdelitem | descriptiondelitem'},
        { name: '!createtrader', value: 'Inscriver vous en tant que marchand, exemple : !createtrader votrenom'},
        { name: '!showtraders', value: 'Regarder la liste des marchands de votre univers, exemple : !showtraders'})
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
    .setFooter('Made With Love By Alexandre', 'https://i.imgur.com/wSTFkRM.png');
    
    //Envoi de l'embed dans le channel
    message.channel.send(embed);

}

module.exports.help = {
    name: 'help'
};