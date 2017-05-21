var express = require('express');
var app = express();

var router = require('./router.js');
router(app);
app.set('views', __dirname + '/web');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

var server = app.listen(80,function(){
    console.log('i\'m up');
});