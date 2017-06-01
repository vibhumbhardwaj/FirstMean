var config = require('./config.js');
var jwt = require('jsonwebtoken');
var config = require('./config.js');

var express = require('express');
var router = express.Router();

router.post('/iLikeThis', function(req, res){
    console.log(req.get('Authorization'));
    jwt.verify(req.get('Authorization'), config.secretKey, function(err, token){
        if(err){ 
            console.log('koi na. shit happens.');
            res.send(err);
        }
    });

})

module.exports = router;