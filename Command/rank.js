const { createCanvas, loadImage} = require('canvas');
const Discord = require("discord.js");
const leveling = require('discord-leveling');

module.exports.run = async (client, message, args) => {

    message.delete();

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    const data = await leveling.Fetch(user.id);
    if(!data) return message.reply('Ce membre n\'a pas encore de rank');

    const canvas = createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage("./utils/img/wallpaper.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();

    ctx.fillStyle = "#e67e22";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${data.xp} / 1000 XP`, 600, 260);

    ctx.textAlign = "left";
    ctx.fillText(user.tag, 300, 120);

    ctx.font = "50px Arial";
    ctx.fillText(`Niveau: ${data.level}`, 300, 180);
    ctx.fillText(`${data.level}`, 47, 180);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
    message.channel.send(`Carte de LVL pour **${user.username}**`, attachment);
}

module.exports.help = {
    name: 'rank'
};