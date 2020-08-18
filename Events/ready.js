module.exports = (client) => {
    console.log("Bot Prêt");
    //client.user.setAvatar('./avatar.jpg');
    client.user.setActivity("En cour de développement", {type: 'PLAYING'})
};