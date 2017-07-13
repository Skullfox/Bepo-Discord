module.exports = {
  start : function() {

    var express = require('express');
    var app = express();
    var http = require('http');
    var server = http.createServer(app);

    var port = 4241;

    app.listen(port, function () {
      console.log('Bepo is listening, open http://localhost:4241');
    })

    app.use('/static', express.static(_root + '/core/www/static'));
    app.get('/', function (req, res) {
      res.sendFile(_root + '/core/www/index.html');
    })

  }

};
