const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '!';


//Base du Command Handler
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

// Contient le Command Handler et la fonction XP
client.on('message', async (message) => {

  const messageArray = message.content.split(/\s+/g);
  const command = messageArray[0];
  const args = messageArray.slice(1);

  console.log(messageArray)

  if (!command.startsWith(prefix)) return;

  const cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(client, message, args);
  if (message.author.bot) {
    return;
  }
});

//Envoi un message a chaque fois que le bot rejoins un serveur
client.on('guildCreate', (guild) => {
  let owner = guild.owner;
  const user = client.users.cache.get(owner["id"]);
  user.send("Salutation, je suis Kashir ! C'est moi qui serait en charge de vous aider dans toutes vos taches ! Mais pour le moment, il faudra que vous fassiez cet commande pour me configurer en suivant bien les espaces et les informations demandés : !config 'ip' 'nom d'utilisateur' 'mot de passe' 'nom de la base de données' 'nom de la catégorie réservé aux fiches' 'nom de la catégorie réservé au staff' (pas besoin de mettre les infos entre '')");
})

client.login('NzM1MjQzMDk0MjQ0NzIwNjQw.XxdafQ.yKA6xzdBkPgJov5xVz_KCZJLwXM');
