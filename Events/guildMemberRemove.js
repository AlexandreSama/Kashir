const canvas = require("discord-canvas"),
  goodbyeCanvas = new canvas.Goodbye();
const Discord = require('discord.js');


module.exports = async (client, member, message, fs) => {

    let myChannel = 'goodbye'
    let category = message.guild.channels.cache.find(cat=> cat.name === myChannel)
    console.log(category + "Jusque la ca passe")

    let image = await goodbyeCanvas
    .setUsername(member.username)
    .setDiscriminator(member.tag)
    .setMemberCount("5")
    .setGuildName("Koiba's Serveur")
    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .toAttachment();

    let attachment = new MessageAttachment(image.toBuffer(), "goodbye-image.png");
  
    category.send(attachment)

};