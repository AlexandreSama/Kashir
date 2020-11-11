const Discord = require('discord.js');
const si = require('systeminformation');

module.exports.run = async (client, message) => {

    let msg = await message.channel.send("Veuillez patienter pendant le chargement de vos informations...")

    function bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    }

    function FixedNumber(number) {
        const percentage = number.toFixed(0);
        return percentage;
    }

    si.currentLoad()
    .then(data => 
        si.mem()
        .then(datas =>
            setTimeout(() => {
                // Edit msg 20 seconds later
                msg.edit('Charge du processeur : ' + FixedNumber(data['currentload']) + '%' + '\nRam utilisé : ' + bytesToSize(datas['used']) + '\nRam disponible : ' + bytesToSize(datas['available']))
              }, 1000))
        .catch(error => console.error(error))
    .catch(error => console.error(error)))
}

module.exports.help = {
    name: 'machinestatus'
}
