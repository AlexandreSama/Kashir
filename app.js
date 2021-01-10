const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '!';
const db = require('quick.db');
const canvas = require("discord-canvas"),
  goodbyeCanvas = new canvas.Goodbye(),
  welcomeCanvas = new canvas.Welcome();


fs.readdir('./Command/', (error, f) => {
  if (error) {
    return console.error(error);
  }
  const commandes = f.filter((f) => f.split('.').pop() === 'js');
  if (commandes.length <= 0) {
    return console.log('Aucune commande trouvée !');
  }

  commandes.forEach((f) => {
    const commande = require(`./Command/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commande.help.name, commande);
  });
});

fs.readdir('./Events/', (error, f) => {
  if (error) {
    return console.error(error);
  }
  console.log(`${f.length} events chargés`);

  f.forEach((f) => {
    const events = require(`./Events/${f}`);
    const event = f.split('.')[0];
    client.on(event, events.bind(null, client, fs));
  });
});

function xp(message) {
  const randomNumber = Math.floor(Math.random() * 10) + 15;
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber);
  db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber);
  const level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
  const xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
  const xpNeeded = level * 500;
  if (xpNeeded < xp) {
    const newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 2);
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
    message.channel.send(`${message.author}, tu est monté au niveau ${newLevel}`);
  }
}

client.on('message', async (message) => {

  const messageArray = message.content.split(/\s+/g);
  const command = messageArray[0];
  const args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  const cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(client, message, args);
  if (message.author.bot) {
    return;
  }

  xp(message);
});

client.on('guildMemberAdd', async member => {

  let channelName = 'allées-et-venus';
  const channel = member.guild.channels.cache.find(channel => channel.name === channelName)
  let guildName = member.guild.name;
  let guildCount = member.guild.memberCount;
  let memberAvatar = member.user.displayAvatarURL({dynamic : true});
  let role = message.guild.roles.find(r => r.name === "Adorateurs");

  member.roles.add(role)

  let image = await welcomeCanvas
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(guildCount)
  .setGuildName(guildName)
  .setAvatar(memberAvatar)
  .setText("title", "Bienvenue")
  .setText("message", "Bienvenue sur le serveur {server}")
  .setText("member-count", "- {count}ème membres")
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .toAttachment();

  let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

  channel.send(attachment);
});

client.on('guildMemberRemove', async member => {

    let myChannel = 'allées-et-venus'
    let category = member.guild.channels.cache.find(cat=> cat.name === myChannel)
    let guildName = member.guild.name;
    let guildCount = member.guild.memberCount;

    let image = await goodbyeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(guildCount)
    .setGuildName(guildName)
    .setText("title", "Adieu")
    .setText("message", "s'en va du serveur {server}")
    .setText("member-count", "- nous ne sommes plus que {count} membres")
    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .toAttachment();

    let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
  
    category.send(attachment)
})

client.on('guildCreate', (message) => {
  message.channel.send("Salutation, je suis Kashir ! C'est moi qui serait en charge de vous aider dans toutes vos taches ! Mais pour le moment, il faudra que vous fassiez cet commande pour me configurer en suivant bien les espaces et les informations demandés : !config 'ip' 'nom d'utilisateur' 'mot de passe' 'nom de la base de données' 'nom de la catégorie réservé aux fiches' 'nom de la catégorie réservé au staff' (pas besoin de mettre les infos entre '')")
})

client.login('NzM1MjQzMDk0MjQ0NzIwNjQw.XxdafQ.oqkc6R2R1oC_EpIJk9-ouDdpe_g');
