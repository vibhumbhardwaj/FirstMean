var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var adapter = require('./mongoadapter');
var config = require('./config.js');

var findthis = {};

router.get('/getBooks', function (req, res) {
    if(req.query.q){
        var reg = RegExp(req.query.q);
        findthis = {book: reg};
    }
    else{ 
        findthis = {};
    }
    adapter.getBooks(findthis, parseInt(req.query.v), function (err, books) {
        if (err) console.log('shit happened at Service');
        res.json(books);
    });
});
console.log('Setting up APIs');

router.post('/authenticate', function(req,res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        adapter.getUser({username : username, password : password}, function(err, user){
            if(err || !user){
                console.log('Authentication Error ' + err);
                res.send({success: false, message: 'LOGIN ERROR'});
            }
            else{
                console.log(user);
                console.log('only data; ' + user.username);
                var token = jwt.sign({username: user.username}, config.secretKey, {expiresIn: 1440*60});
                console.log('I just gave someone a token');
                res.json({success: true, token: token, message: 'Ash with cash.'});
            }
        });
    }
    else{
        res.send('WHAT THE FUCK MATE?');
    }
})


module.exports = router;