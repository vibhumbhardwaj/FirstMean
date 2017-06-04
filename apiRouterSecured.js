var config = require('./config.js');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var adapter = require('./mongoadapter');
var serviceHelper = require('./serviceHelper.js');

router.use(function(req,res,next){
    console.log('[INFO] ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method +' --> ' + req.url.toString());
    console.log('[INFO] Validating Token: ' + req.get('Authorization'));
    jwt.verify(req.get('Authorization'), config.secretKey, function(err, decodedToken){
        if(err){ 
            console.log('[ERROR] Could not decode token. Token: ' + req.get('Authorization'));
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




router.post('/toggleUpvote', function(req,res){
    var book = req.body.book;
    var user = req.session.user;
    var currentUpvote = serviceHelper.getUpVoteStatus(book, user);

    if(currentUpvote == 0){
        book.upvoted_by_users.push({userId: user._id, userName: user.name});
        user.books_he_likes.push({bookId: book._id, bookName: book.book});
        book.points++;
    }

    if(currentUpvote == 1){
        deleteThisUser = book.upvoted_by_users.findIndex(function(ele){
            return ele.userId == user._id;
        });
        deleteThisBook = book.upvoted_by_users.findIndex(function(ele){
            return ele.bookId == book._id;
        });

        book.upvoted_by_users.splice(deleteThisUser,1);
        user.books_he_likes.splice(deleteThisBook,1);
        book.points--;
    }

    if(currentUpvote == -1){
        res.send({success: false, message: 'Upvote is disabled, You need to unflag it first.'});
        return;
    }

    console.log('[INFO] Saving upvote details to the database...');
    adapter.saveToDB(book, user, function(err, book, user){
        if(err){
            console.log('[ERROR] trace- ' + err);
            res.send({success: false, message: 'Sorry, couldn\'t upvote.'});
            return;
        }
        req.session.user = user;
        res.json({success: true, book: book});
    })

    
})




module.exports = router;