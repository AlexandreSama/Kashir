const Canvas = require('canvas');
const Discord = require("discord.js");
const leveling = require('discord-leveling');

module.exports.run = async (client, message) => {

    message.delete();

    let user = message.mentions.users.first() || message.author

    let output = await leveling.Fetch(user.id)

    let passxp = 1000;

    let before = passxp - output.xp;

    const canvas = Canvas.createCanvas(1000, 500);

    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./utils/img/wallpaper.jpg');
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 25, 25, 200, 200);
    ctx.strokeStyle = "#327828";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '70px "Sans Serif"';
    ctx.fillStyle = "#ff0000";

    //Username of the user
    ctx.fillText(user.tag, canvas.width / 3.5, canvas.height / 3.9, 320);

    //Xp of the user
    ctx.fillText(`${output.xp} xp`, 5.9, canvas.height / 1);

    //Missing XP before lvl up
    ctx.fillText(`${before} xp restant avant de \n monter de niveau`, canvas.width / 1.5, canvas.height / 1.2, 320);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'custom__image.png');

    message.channel.send(attachment)
    .catch(console.error);

}

module.exports.help = {
    name: 'test'
};