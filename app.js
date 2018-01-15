var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var passport = require('passport');
//var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
// var nav = [{
//     Link: '/api',
//     Text: 'Book'
// }];

var getNode = require('./src/controllers/get');
var putNode = require('./src/controllers/put');


//app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/js', express.static('js'));
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(session({secret: 'library'}));

//require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

//app.use('/api/get', apigetRouter);
//app.use('/Admin', adminRouter);
//app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index' );
});

app.get('/api/get', function ( req, res, next ) { getNode ( req, res, next ); } );
app.get('/api/put', function ( req, res, next ) { putNode ( req, res, next ); } );

app.listen(port, function (err) {
    console.log('running server on port http://localhost:' + port);
});