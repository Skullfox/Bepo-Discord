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
  }

};
