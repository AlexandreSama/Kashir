const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const mysql = require('mysql');
const fs = require('fs');
const mcping = require('mcping-js');
const { time } = require('console');
const prefix = '!';

fs.readdir('./Command/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Command/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

const reponsebarman = [
    "**Le barman s'avance jusqu'a la table avec un grand sourire avant de sortir son carnet et un stylo**\n puis-je prendre votre commande ?",
    "**Le charmant Barman nota la commande avec un grand sourire**\n\n bien, je reviens d'ici quelques minutes\n **Le Barman parti vers le comptoir, préparant en sifflotant la commande**",
    "**Le Barman revint avec la commande, un sourire chaleureux aux lèvres**\n\n et voila, bonne soirée \n\n **Il reparti au comptoir s'occuper des autres commandes**"
];
let idmessage = [];

client.on('message', message => {
    
    const messageaverifier = message.content.split(" ");
    const verification = messageaverifier.indexOf(";");
    const checkid = idmessage.indexOf(message.author.id);
    const id = message.author.id;
    
    if (message.author.bot) {
        return;
    }
    
    if (verification >= 0) {
    
        if (checkid < 0) {
            idmessage.unshift(id);
            idmessage.push('0');
            message.channel.send(reponsebarman[0])
            // console.log("premier message")
        }
        if (checkid >= 0 & idmessage.indexOf("0") >= 1 ){
            idmessage.pop();
            console.log(idmessage)
            idmessage.push("1")
            console.log(idmessage)
            message.channel.send(reponsebarman[1])
            // console.log("Deuxième Message")
        }
        if (checkid >= 0 & idmessage.indexOf("1") >= 1){
            message.channel.send(reponsebarman[2])
            // console.log("Troisième Message")
        }
    
    }
    if(message.content === `${prefix}id`){
        message.channel.send(idmessage)
    }
});

client.on('guildMemberAdd', member => {

    console.log(`L'utilisateur'` + member.user.tag + `a rejoins le serveur!`);
    var role = member.guild.roles.cache.find(role => role.name === 'Joueurs');
    member.roles.add(role);

})

client.login('');