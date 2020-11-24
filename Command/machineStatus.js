const Discord = require('discord.js');
const si = require('systeminformation');

module.exports.run = async (client, message) => {

    //On envoi un message avec un await de façon asynchrone pour faire patienter l'utilisateur
    let msg = await message.channel.send("Veuillez patienter pendant le chargement de vos informations...")

    //On crée une fonction permettant de transformer un nombre en byte en un nombre en KB, MB, GB ou TB
    function bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    }

    //On s'arrête a la virgule pour éviter un nombre trop grand
    function FixedNumber(number) {
        const percentage = number.toFixed(0);
        return percentage;
    }

    //On récupère la charge actuel de la machine
    si.currentLoad()
    .then(data => 
        //On récupère la charge de la mémoire
        si.mem()
        .then(datas =>
            //On patiente 1 seconde
            setTimeout(() => {
                // On édite le message précédent juste après avec les infos que l'on veut (ici la charge actuel, la ram utilisé et la ram disponible)
                msg.edit('Charge du processeur : ' + FixedNumber(data['currentload']) + '%' + '\nRam utilisé : ' + bytesToSize(datas['used']) + '\nRam disponible : ' + bytesToSize(datas['available']))
              }, 1000))
            // Je met un console.log le temps de trouver une solution pour les logs
            .catch(error => console.error(error))
            // Je met un console.log le temps de trouver une solution pour les logs
            .catch(error => console.error(error)))
}

module.exports.help = {
    name: 'machinestatus'
}
