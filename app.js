var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 5000;

//functions that is invoked on user demand
var getNode = require('./api/get');
var putNode = require('./api/put');

app.use(bodyParser.json());

//Where to find static files the user requests
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/static'));

//routing to functions
app.get('/api/get', function ( req, res, next ) { getNode ( req, res, next ); } );
app.get('/api/put', function ( req, res, next ) { putNode ( req, res, next ); } );

//RUN!
app.listen(port, function (err) {
    console.log('running server on port http://localhost:' + port);
});