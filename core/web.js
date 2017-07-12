module.exports = {
  start : function() {

    const express = require('express')
    const app = express()

    var port = 4241;

    app.use('/static', express.static(_root + '/core/www/static'));
    app.get('/', function (req, res) {
      res.sendFile(_root + '/core/www/index.html');
    })

    app.listen(port, function () {
      console.log('Bepo is listening, open http://localhost:4241');
    })

  },

};
