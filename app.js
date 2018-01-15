var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 5000;

var getNode = require('./api/get');
var putNode = require('./api/put');

app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.use(express.static(__dirname + '/static'));
app.get('/api/get', function ( req, res, next ) { getNode ( req, res, next ); } );
app.get('/api/put', function ( req, res, next ) { putNode ( req, res, next ); } );

app.listen(port, function (err) {
    console.log('running server on port http://localhost:' + port);
});