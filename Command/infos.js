const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = (client, message, args) => {

    message.delete();
    //On récupère l'info si on ping quelqu'un ou non
    const membre = message.mentions.members.first() || message.member;
    //On récupère les roles de la personne
    const roles = membre.roles.cache.map(r => `${r}`).join(' | ');
    //On récupère son derner message
    const lastMessage = membre.user.lastMessage;
    const lastMessagesChannel = membre.user.lastMessageChannelID;
    //On récupère le pseudo de la personne visée
    const pseudo = membre.user.username;
    //On récupère ensuite son activité(s'il en a une !)
    const activity = membre.user.presence.activities;
    //Puis on récupère les détails de l'activité
    const details = activity[0]['details'];
    //On récupère sa PDP (pour que ca fasse beau mdr)
    const pdp = membre.user.avatarURL();

    //Ici, on crée le panneau qui affichera les informations de la personne, 
    //Ce sera les paramètres prédéfini(qui ne bougerons plus)
    const embed = new Discord.MessageEmbed()
    .setColor('#8d4db3')
    .setTitle(`Panel d'informations`)
    .setImage(pdp)
    .setFooter(`Panel d'informations`)
    .setTimestamp()

    //De base, les status sont en anglais, mais avec ceci, on les traduis en français
    if (membre.user.presence.status === 'dnd') {
        var status = 'Ne pas Déranger'
    }else if (membre.user.presence.status === 'online') {
        var status = 'Connecté'
    }else if(membre.user.presence.status === 'idle'){
        var status = 'Absent'
    }else if (membre.user.presence.status === 'offline') {
        var status = 'Déconnecté'
    }

    if(lastMessage == null){
        var lastMessages = "Impossible de retrouver le dernier message";
    }else if(lastMessagesChannel == null){
        var lastMessagesChannels = "Impossible de retrouver le channel ou se trouve le dernier message";
    }else{
        var lastMessages = lastMessage.content;
        var lastMessagesChannels = client.channels.cache.get(lastMessagesChannel);
    }

        //Alors la, on attaque un petit morceau, on vérifie ici si la personne
        //A une activité ou non, on retrouve ici les lignes de textes du tableau plus haut dessus
        // mais ceux-la sont modifiés en fonction de si la personne a une activité ou non
        if (activity.length === 0) {
        
            embed.addFields({
                name: 'Roles :',
                value: roles
            },
            {
                name: 'Pseudonyme : ',
                value: pseudo
            },
            {
                name: 'Crée le :',
                value: moment.utc(membre.user.createdAt).locale("fr").format("LL")
            },
            {
                name: 'Jeu :',
                value: 'Aucun jeu'
            },
            {
                name: 'Status',
                value: status
            },
            {
                name: 'Rejoins le :',
                value: moment.utc(membre.joinedAt).locale("fr").format("LL")
            },
            {
                name: 'Dernier message',
                value: `${lastMessages}\n${lastMessagesChannels}`, inline: true
            })
    
        }else if (activity.length > 0) {
    
            embed.addFields({
                name: 'Roles :',
                value: roles 
            },
            {
                name: 'Pseudonyme : ',
                value: pseudo
            },
            {
                name: 'Crée le :',
                value: moment.utc(membre.user.createdAt).locale("fr").format("LL")
            },
            {
                name: 'Jeu :',
                value: `${activity}\n${details}`, inline: true
            },
            {
                name: 'Status',
                value: status
            },
            {
                name: 'Rejoins le :',
                value: moment.utc(membre.joinedAt).locale("fr").format("LL")
            },
            {
                name: 'Dernier message',
                value: `${lastMessages}\n${lastMessagesChannels}`, inline: true
            })
    }

    //Et ici, on arrive a la fin, on envois le message (donc le tableau)
    message.channel.send(embed);
    //console.log(roles);

}

module.exports.help = {
    name: 'infos'
};
