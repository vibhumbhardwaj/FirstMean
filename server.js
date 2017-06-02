var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');

app.set('views', __dirname + '/web');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(morgan('dev'));
app.use(session({secret: "oye"}));

app.use(express.static('./static')); 
/*
var router = require('./router.js');
var apiRouter = require('./apiRouter.js');
router(app);
apiRouter(express,app);
*/
var viewRouter = require('./viewRouter.js');
var apiRouter = require('./apiRouter.js');
var apiRouterSecured = require('./apiRouterSecured.js');

app.use('/site',viewRouter);
app.use('/site/gateway', apiRouter);
app.use('/site/gateway/secure', apiRouterSecured);



var server = app.listen(80,function(){
    console.log('[STARTUP] Web Server Up.');
});
