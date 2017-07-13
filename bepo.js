const Discord = require('discord.js');
const config = require('./config.json');
ytdl = require('ytdl-core');

var web = require('./core/web.js');
var socket = require('./core/socket.js');

/* Settings & other stuff*/
_root = __dirname;
_b = require('./core/functions.js');
beposVoicechannel = null;



web.start();
socket.start();

bepo = new Discord.Client();
bepo.login(config.token);



bepo.on('ready', () => {
  console.log('Aye!');
});


/*
bepo.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
});

*/

bepo.on('message', message => {


  socket.emit({
    "event" : "message",
    "data" : {
      "channelID" : message.channel.id,
      "message" : message.content,
      "userID" : message.author.id,
      "username" : message.author.username,
      "createdTimestamp" : message.createdTimestamp / 1000
    }
  });

});

bepo.on('message', message => {
  if (message.content.startsWith('b.join')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);

    voiceChannel.join()
      .then(connnection => {
        beposVoicechannel = voiceChannel;
      });
  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.stop')) {
    _b.stopMusic();
  }
});




bepo.on('message', message => {
  if (message.content.startsWith('b.leave')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    beposVoicechannel.leave();
  }
});

/* Play Music */
bepo.on('message', message => {
  if (message.content.startsWith('b.play')) {



    if(beposVoicechannel == null)
      return message.reply(`Please be in a voice channel first!`);

    const args = message.content.split(/\s+/g).slice(1);

    var video = args[0];
    _b.playMusic(video);

  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.start')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.join()
      .then(connnection => {
        /*
        const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
        */

        connnection.on('speaking',(user,speaking) => {
          console.log(user.username);
          console.log(speaking);


          /* Get user in channels */
          var channelUser = {};
          voiceChannel.members.map(function(user){
            console.log("+++++ user in channel +++++");
            console.log(user.user.username);

            var index = user.user.id;
            console.log(index);
            var usr = {
              index : user.user.username
            };
            //Object.assign(channelUser,usr);
            channelUser[index] = usr;
          });

          console.log( channelUser );

          socket.emit({
            "event" : "talkStatus",
            "user" : {
            "displayAvatarURL" : user.displayAvatarURL,
            "id" : user.id,
            "username" : user.username
          }, "speaking" : speaking});

        } );

      });
  }
});
