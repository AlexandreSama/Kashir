const Canvas = require('canvas');
const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (client, message, args) => {

    message.delete();
    const user = message.author;

    const commandName = "!rankcsgo ";

    const argument = message.content.slice(commandName.length).trim().split(' ');

    request(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=768505E0BFDDF8BCAEA1F60B51F096F8&steamid=${argument}`, { json: true }, async (err, res, body) => {
        if(err){
            console.log(err)
            message.channel.send("Attention, vérifie ton steamid ! Sinon, l'API est en panne !")
        }

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://media.giphy.com/media/cOinCESu87UR5AG76a/giphy.gif');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '50px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('kills:', canvas.width / 2.5, canvas.height / 3.5);

        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${body["playerstats"]["stats"][0]["value"]}`, canvas.width / 2.5, canvas.height / 1.8);

        ctx.font = '50px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('morts:', canvas.width / 1.5, canvas.height / 3.5);

        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${body["playerstats"]["stats"][1]["value"]}`, canvas.width / 1.5, canvas.height / 1.8);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        message.channel.send(`Voyons voir tes stats!`, attachment);

});
}


module.exports.help = {
    name: 'infocsgo'
};