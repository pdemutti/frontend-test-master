var express = require('express');
var fs = require('fs');

var cookieParser = require('cookie-parser')
var app = express();

app.use(express.static('public'));

app.use(cookieParser());

app.get('/schema-json', function(req, res){
  var schemaJson = JSON.parse(fs.readFileSync('./schema/fields.json', 'utf8'));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(schemaJson));
});

var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log('Listening on 3001');
});
