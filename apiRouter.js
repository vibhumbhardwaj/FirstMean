var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var adapter = require('./mongoadapter');
var config = require('./config.js');
var serviceHelper = require('./serviceHelper.js');

var findthis = {};
var session;
var date = new Date();

router.use(function(req,res,next){
    console.log('[INFO] ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method +' --> ' + req.url.toString());
    next();
})


router.get('/getBooks', function (req, res) {
    if(req.query.q){
        var reg = RegExp(req.query.q);
        findthis = {book: reg};
    }
    else{
        findthis = {};
    }
    adapter.getBooks(findthis, parseInt(req.query.v), function (err, books) {
        if (err){ console.log('[ERROR] shit happened at Service. books: ' + books); res.json({success: false}); return;}
        books = serviceHelper.mapUserToBooks(books, req.session.user);
        res.json(books);
    });
});
console.log('[STARTUP] Setting up APIs');

router.post('/authenticate', function(req,res){
    session = req.session;
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        adapter.getUser({username : username, password : password}, function(err, user){
            if(err || !user){
                console.log('[ERROR] Authentication Error ' + err);
                res.send({success: false, message: 'LOGIN ERROR'});
            }
            else{
               // console.log(user);
               // console.log('only data; ' + user.username);
                var token = jwt.sign({user: user._id}, config.secretKey, {expiresIn: 1440*60});
                console.log('[INFO] I just gave someone a token');
                session.user = user;
                res.json({success: true, token: token, user: user, message: 'Ash with cash.'});
            }
        });
    }
    else{
        res.send('[ERROR] WHAT THE FUCK MATE? @ Authentication Service');
    }
})


module.exports = router;