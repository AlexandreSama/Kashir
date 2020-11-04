const db = require('quick.db');
const Canvacord = require('canvacord');
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    message.delete();

    var user = message.mentions.users.first() || message.author;
    console.log(user)
    var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0
    let niveau = parseInt(level)
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0
    var xpNeeded = level * 500 +500
    let every = db
    .all()
    .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
    .sort((a, b) => b.data - a.data);
    var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
    let rang = parseInt(rank)

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
     
    card.build()
    .then(data => {
        message.channel.send(new Discord.MessageAttachment(data, "RankCard.png"))
    });
}

module.exports.help = {
    name: 'rank'
};