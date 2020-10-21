const Canvas = require('canvas');
const Discord = require("discord.js");

module.exports.run = async (client, message) => {

    message.delete();

    Canvas.registerFont("./DancingScript-Regular.ttf", {family: 'Dancing Script'})

    const canvas = Canvas.createCanvas(1000, 500);

    let user = message.author;

    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 25, 25, 200, 200);
    ctx.strokeStyle = "#327828";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '70px "Dancing Script"';
    ctx.fillStyle = "#ff0000";
    ctx.fillText(user.tag, canvas.width / 4.0, canvas.height / 3.9, 320);
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