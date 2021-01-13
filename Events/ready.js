//Quand le bot est prêt, je récupère des infos et je les mets dans un array pour m'en servir comme Activity
module.exports = (client) => {
    
    console.log("Bot Prêt");

    let servernumber = client.guilds.cache.size;
    let usersnumber = client.users.cache.size;

    setInterval(() => {
    	let activiter = [`Actuellement sur ${servernumber} serveurs auquels je suis attaché!`, `Je compte ${usersnumber} membres m'utilisant !`, `Mon Créateur a dit que j'étais gratuit !`, `Mon créateur est entrain de développer une IA pour moi !`, `Chaque bug est une tasse de thé vide`, `Je suis encore en plein développement alors attention a moi !`, `Je suis mis a jour sur Github tout les soirs a 19h !`]
    	const index = Math.floor(Math.random() * (activiter.length - 1) + 1);
    	client.user.setActivity(activiter[index], { type: 'WATCHING'});
    }, 15000);
};
