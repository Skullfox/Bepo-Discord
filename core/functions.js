module.exports = {

  getChannel : function(guildID){

    try {
      var guild = bepo.guilds.get(guildID);
      // Returns message.guild

      var list = {};
      guild.channels.map(function(c){

        if(c.type == "text"){
          list[c.calculatedPosition] = {
            "id" : c.id,
            "name" : c.name
          };
        }

      });
    } catch (e) {
      list = {}
    }



    return list;
  },

  playMusic : function(video){
    var url = "https://www.youtube.com/watch?v=" + video;
    console.log(url);
    var connnection = bepo.voiceConnections.first();


        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);

  },

  stopMusic : function(){

      var v = bepo.voiceConnections.first();
    //  console.log(v.dispatcher.end());
      v.dispatcher.end()

  }

};
