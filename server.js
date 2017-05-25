var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');


app.use(express.static('./static')); 
var router = require('./router.js');
var apiRouter = require('./apiRouter.js');
router(app);
apiRouter(express,app);

app.set('views', __dirname + '/web');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var server = app.listen(80,function(){
    console.log('i\'m up');
});