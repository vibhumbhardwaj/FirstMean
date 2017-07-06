var config = require('./config.js');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var adapter = require('./mongoadapter');
var serviceHelper = require('./serviceHelper.js');

router.use(function (req, res, next) {
    if (!req.cookies) {
        console.log('cookies not found.');
        res.send({ sorry: true, regret: false })
        return;

    }
    var tokenFromCookies = req.cookies.Authorization;
    console.log('[INFO]@SECURED ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method + ' --> ' + req.url.toString());
    console.log('[INFO] Validating Token: ' + tokenFromCookies);
    jwt.verify(tokenFromCookies, config.secretKey, function (err, decodedToken) {
        if (err) {
            console.log('[ERROR] Could not decode token. Token: ' + tokenFromCookies);
            res.send({ success: false, message: 'token can\'t be verified, sorry.' });
        }
        else {
            console.log('[INFO] The User: ' + decodedToken);
            console.log(decodedToken.user);
            console.log(req.session.user._id);
            if (decodedToken.user != req.session.user._id) {
                console.log('[ERROR] Token Compromised. Team, Fall Back.');
                res.send({ success: false, message: 'token can\'t be verified, sorry.' });
            }
            else {
                console.log('[INFO] User Verified. Can do the secure journey.');
                next();
            }
        }
    });
});


router.all('/iLikeThis', function (req, res) {
    res.send({ success: true, message: 'token verified, thats good ' + req.userFromToken });
});




router.post('/toggleUpvote', function (req, res) {
    var id = req.body.bookId;
    if (id.match(config.mongoIdRegex).length == 1) {
        adapter.getBookDetail(id, function (err, book) {
            if (err) {
                res.send({ success: false, message: 'Error getting book details..', book: null });
                return;
            }
            var user = req.session.user;
            var currentUpvote = serviceHelper.getUpVoteStatus(book, user);

            if (currentUpvote == 0) {
                book._doc.upvoted_by_users.push({ userId: user._id, userName: user.name });
                user.books_he_voted.push({ bookId: book._id, bookName: book.book, upvote: true });
                book._doc.points++;
            }

            if (currentUpvote == 1) {
                deleteThisUser = book._doc.upvoted_by_users.findIndex(function (ele) {
                    return ele.userId == user._id;
                });
                deleteThisBook = book._doc.upvoted_by_users.findIndex(function (ele) {
                    return ele.bookId == book._id;
                });

                book._doc.upvoted_by_users.splice(deleteThisUser, 1);
                user.books_he_voted.splice(deleteThisBook, 1);
                book._doc.points--;
            }

            if (currentUpvote == -1) {
                res.send({ success: false, message: 'Upvote is disabled, You need to unflag it first.' });
                return;
            }

            console.log('[INFO] Saving upvote details to the database...');
            adapter.saveToDB(book._doc, user, function (err, book, user) {
                if (err) {
                    console.log('[ERROR] trace- ' + err);
                    res.send({ success: false, message: 'Sorry, couldn\'t upvote.' });
                    return;
                }
                req.session.user = user;
                res.json({ success: true, book: book });
            });
        });
    }
    else {
        res.send({ success: false, message: 'I don\'t like your intentions mate. I\'m not sending you any data.', data: null });
    }

})


module.exports = router;