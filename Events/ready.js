module.exports = (client) => {
    
    console.log("Bot Prêt");

    setInterval(() => {
    	let servernumber = client.guilds.cache.size;
    	let usersnumber = client.users.cache.size;
    	let activiter = [`Actuellement sur ${servernumber} serveurs auquels je suis attaché!`, `Je compte ${usersnumber} membres m'utilisant !`]
    	const index = Math.floor(Math.random() * (activiter.length - 1) + 1);
    	client.user.setActivity(activiter[index], 'WATCHING');
    }, 15000);
};
