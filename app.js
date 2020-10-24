/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '!';
const db = require('quick.db');

const infos = [];

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
  infos.push(`${commandes.length}`);
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

client.on('guildMemberAdd', (member) => {
  let channelName = 'welcome';
  const channel = client.channels.cache.find(channel => channel.name === channelName)
  channel.send(member.user.tag + ` nous a rejoins, bienvenue a toi !`)
  const role = member.guild.roles.cache.find((role) => role.name === 'Les copains');
  member.roles.add(role);
});

client.on('guildMemberRemove', (member) => {
  console.log(`L'utilisateur'` + member.user.tag + `a quitté le serveur, dommage!`);
  let channelName = 'goodbye';
  const channel = client.channels.cache.find(channel => channel.name === channelName)
  channel.send(member.user.tag + ` nous a quitté malheureusement !`);
})
client.login('');
