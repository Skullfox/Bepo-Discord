function add2Playlist(track,guildID){

  var playlist = global.utils.loadJson(global._playlist + "/" + guildID,{ "tracks" : [] });

  playlist.tracks.push({"title" : track.title,"url": track.url});
  global.utils.saveJson(global._playlist + "/" + guildID,{ "tracks" : playlist.tracks } );

  console.log("Playlist:");
  console.dir(playlist);
}

module.exports = add2Playlist;
