function searchTrack(message){

  var args = message.content.split(/\s+/g).slice(1);

  var searchFor = ( args.length > 0) ? args.join(" ") : false;

  if(searchFor == false){
    message.reply("need a link or strings");
    return false;
  }

    var opts = {
      maxResults: 1,
      key: global.config.youtube
    };

    global.ytsearch(searchFor, opts, function(err, results) {
      if(err) return console.log(err);

      if(results.length > 0){
        var url = "https://www.youtube.com/watch?v=" + results[0].id;

        message.channel.send(":radio: " + results[0].title + " was  added");

        global.utils.add2Playlist({"title" : results[0].title, "url" : url},message.guild.id);

      }else{
        console.log("we got nothing")
        message.reply("nothing found");
      }

    });


}

module.exports = searchTrack;
