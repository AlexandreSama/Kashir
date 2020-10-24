const Canvas = require("discord-canvas");
const Discord = require("discord.js");
const guild = new Discord.Guild();

module.exports = async (client, member, message) => {

    let user = member.user;

    const image = await new Canvas.Goodbye()
        .setUsername(user.username)
        .setDiscriminator(user.tag)
        .setMemberCount(guild.memberCount)
        .setGuildName(guild.name)
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .toAttachment();
 
    message.channel.send(new Discord.MessageAttachment(image, "RankCard.png"));

};