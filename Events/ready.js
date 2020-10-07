module.exports = (client, fs) => {
    console.log("Bot Prêt");
    //client.user.setAvatar('./avatar.jpg');
    client.user.setActivity("Help => !help", {type: 'PLAYING'})
};