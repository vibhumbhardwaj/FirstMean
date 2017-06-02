var config = require('./config.js');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var adapter = require('./mongoadapter');


router.use(function(req,res,next){
    console.log('[INFO] ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method +' --> ' + req.url.toString());
    console.log('[INFO] Validating Token: ' + req.get('Authorization'));
    jwt.verify(req.get('Authorization'), config.secretKey, function(err, decodedToken){
        if(err){ 
            console.log('[ERROR] koi na. shit happens. Token: ' + req.get('Authorization'));
            res.send({success: false, message: 'token can\'t be verified, sorry.'});
        }
        else{
            if(decodedToken._id != req.session.user._id){
                console.log('[ERROR] Token Compromised. Team, Fall Back.');
                res.send({success: false, message: 'token can\'t be verified, sorry.'});
            }
            else{
                console.log('[INFO] User Verified. Can do the secure journey.');
                next();
            }
        }
    });
});


router.post('/iLikeThis', function(req, res){
    res.send({success: true, message: 'token verified, thats good ' + req.userFromToken});
});


router.post('/upVoteBook', function(req,res){
    adapter.
})




module.exports = router;