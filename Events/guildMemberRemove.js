const canvas = require("discord-canvas"),
  goodbyeCanvas = new canvas.Goodbye();
const Discord = require("discord.js");
const guild = new Discord.Guild();

module.exports = async (client, message) => {

    let channelName = 'goodbye';
    const channel = client.channels.cache.find(channel => channel.name === channelName)

    let image = await goodbyeCanvas
    .setUsername(message.author.username)
    .setDiscriminator(message.author.tag)
    .setMemberCount(guild.memberCount)
    .setGuildName(guild.name)
    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .toAttachment();

    let attachment = new MessageAttachment(image.toBuffer(), "goodbye-image.png");
  
    channel.send(attachment)

};