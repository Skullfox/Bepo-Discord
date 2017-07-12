const Discord = require('discord.js');
const config = require('./config.json');
const ytdl = require('ytdl-core');

var web = require('./core/web.js');
var socket = require('./core/socket.js');

/* Settings & other stuff*/
_root = __dirname;

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
  if (message.content.startsWith('++play')) {
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

          socket.emitStatus({"user" : {
            "displayAvatarURL" : user.displayAvatarURL,
            "id" : user.id,
            "username" : user.username
          }, "speaking" : speaking});

        } );

      });
  }
});
