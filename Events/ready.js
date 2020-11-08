module.exports = (client, fs) => {
    console.log("Bot Prêt");
    //client.user.setAvatar('./avatar.jpg');
    client.user.setActivity("Fallais peut-être changé d'activité un jour", {type: 'PLAYING'})
};