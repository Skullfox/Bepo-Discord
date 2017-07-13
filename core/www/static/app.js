$( document ).ready(function() {

  $( ".connect-button" ).click(function() {
    var serverid = $("#form-serverid").val();
    if(serverid == 0)
      return false;

    socket.emit('getChannel', serverid);
  });


  $( "#select-channel" ).change(function() {

    $( "#chat-container div" ).each(function( index ) {
      $( this ).hide();
    });

    var channel =  $(this).val();
    $("#c_"+channel).fadeIn();

  });


  var socket = io('127.0.0.1:4243');

  socket.on('talkStatus', function(obj){
   console.log(obj);
  });

  socket.on('setupChannel', function(channels){

    if(!jQuery.isEmptyObject(channels)) {

       Object.keys(channels).forEach(function(key) {
        var channel = channels[key];

        $( "#select-channel" ).append( '<option value="'+channel.id+'">'+channel.name+'</option>');

        $( "#chat-container" ).append( '<div id="c_'+channel.id+'"></div>');
        $( "#c_" + channel.id ).fadeOut();

      });

      $("#login").fadeOut(function(){
        $("#app").fadeIn();
      });
    }else{
      console.log("empty");
      $("#form-serverid").val("Cant connect to server");
    }

  });

  socket.on('message', function(obj){
    var data = obj.data;

    var time = parseInt(data.createdTimestamp * 1000);
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

    $( "#c_" + data.channelID ).append( '<p class="text"><small>'+hours+':'+minutes+' </small><span class="user">'+data.username+'</span> '+ data.message+'</p>').children(':last').hide().fadeIn();

  });

  socket.on('connect', function(){
    console.warn("Bepo connected");
  });

});
