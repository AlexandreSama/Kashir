const Discord = require('discord.js');
const client = new Discord.Client();
const io = require('@pm2/io');
client.commands = new Discord.Collection();
const fs = require('fs');
const ready = require('./Events/ready');
const prefix = "!";

let infos = [];

fs.readdir('./Command/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Command/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
        infos.push(`${commandes.length}`)
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client, fs));
        });
});

client.on('ready', ready=>{
    infos.push(client.guilds.cache.size);
    fs.writeFile('infos.json', JSON.stringify(infos), (err) => {
        if (err) throw err;
        console.log('Le fichier a été sauvegarder!');
    });
})

client.on('message', message => {

    let test = message.mentions.members.first();
    let test2 = test.joinedAt()
    console.log(test2)

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0]
    let args = messageArray.slice(1)

    if (!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length))
    if (cmd) cmd.run(client, message, args);
    
    
    if (message.author.bot) {return;}
});

client.on('guildMemberAdd', member => {

    console.log(`L'utilisateur'` + member.user.tag + `a rejoins le serveur!`);
    var role = member.guild.roles.cache.find(role => role.name === 'Les copains');
    member.roles.add(role);

})

const latency = io.metric({
    name: 'latency',
    type: 'histogram',
    measurement: 'mean'
  });
  const latencyValue = 0;
  
  setInterval(() => {
    latencyValue = Math.round(Math.random() * 100);
    latency.set(latencyValue);
  }, 100);

client.login('');