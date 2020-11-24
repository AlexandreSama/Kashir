const db = require('quick.db');
const Canvacord = require('canvacord');
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // On supprime le message pour rendre le salon plus propre
    message.delete();

    // On récupère soit la personne identifié sois l'auteur de la commande
    var user = message.mentions.users.first() || message.author;

    //On va chercher le level de la personne a partir du serveur et de l'id de l'auteur ou de l'id de la personne identifié
    var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0
    // On transforme le level en nombre
    let niveau = parseInt(level)
    //On va chercher l'xp de la personne a partir du serveur et de l'id de l'auteur ou de l'id de la personne identifié
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0
    //On calcule l'xp nécessaire pour monter de niveau
    var xpNeeded = level * 500 +500
    //On récupère toutes les infos du serveur spécifique
    let every = db
    .all()
    .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
    .sort((a, b) => b.data - a.data);
    //On récupère l'xptotal de l'utilisateur spécifique dans la map 
    var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
    //On transforme le rang en nombre
    let rang = parseInt(rank)

    //On crée une card venant de Canvocord
    const card = new Canvacord.Rank()
    .setAvatar(user.displayAvatarURL({ format: 'png' }))
    .setBackground('IMAGE', './utils/img/wallpaper.jpg')
    .setProgressBar("#c7864e", "COLOR", true)
    .setRank(rang, "Rang", true)
    .setLevel(niveau, "Niveau ", true)
    .setCurrentXP(xp)
    .setRequiredXP(xpNeeded)
    .setStatus(user.presence.status)
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    
    //On construit la carte puis on envoi un MessageAttachment (un fichier joint) avec la RankCard
    card.build()
    .then(data => {
        message.channel.send(new Discord.MessageAttachment(data, "RankCard.png"))
    });
}

module.exports.help = {
    name: 'rank'
};