var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var adapter = require('./mongoadapter');
var config = require('./config.js');
var serviceHelper = require('./serviceHelper.js');

var findthis = {};

//Implement that loggedin User here also.
router.use(function (req, res, next) {
    console.log('[INFO]@API ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method + ' --> ' + req.url.toString());
    next();
})


router.get('/logout', function (req, res) {
    console.log('[INFO] Deleting User Session...');
    req.session.destroy();
    res.clearCookie('Authorization');
    //test:
    if (!req.session)
        res.send({ success: true, message: 'logout complete' });
    else
        console.log('please dont print please. por favor. Sil Vous Plait !!!!');
});

router.get('/books/:id', function (req, res) {
    var id = req.params.id;
    if (id.match(config.mongoIdRegex).length == 1) {
        adapter.getBookDetail(id, function (err, book) {
            if (err || !book) {
                res.send({ success: false, message: 'Error getting book details..', book: null });
                return;
            }

            if (req.session.user) {
                console.log('[INFO] User logged in, so mixing user data to the book also..');
                book = serviceHelper.mapUserToBook(book, req.session.user);
            }
            else {
                console.log('[INFO] User not logged in.');
                book = serviceHelper.mapUserToBook(book);
            } // todo: no if else. Merge the logic.
            res.json({ success: true, book: book });
        })
    }
    else {
        res.json({ success: false, message: 'I don\'t like your intentions mate. I\'m not sending you any data.', book: null });
    }
})

router.get('/getBooks', function (req, res) {
    var q = req.query.q;
    if (q) {
        if (!(q.match(config.alphaNumericRegex).length == 1)) {
            res.send({ success: false, message: 'I don\'t like your intentions mate. I\'m not sending you any data.', books: null });
            return;
        }
        var reg = RegExp(q);
        findthis = { book: reg };
    }
    else {
        findthis = {};
    }
    adapter.getBooks(findthis, parseInt(req.query.v), function (err, books) {
        if (err) { console.log('[ERROR] shit happened at Service. books: ' + books); res.json({ success: false }); return; }
        if (req.session.user) {
            console.log('[INFO] User logged in, so mixing user data to the book also..');
            books = serviceHelper.mapUserToBooks(books, req.session.user);
        }
        else {
            console.log('[INFO] User is just an enquirer.');
            books = serviceHelper.mapUserToBooks(books);
        }
        res.json({ success: true, books: books });
    });
});
console.log('[STARTUP] Setting up APIs');

router.post('/authoriseChatAccess', function (req, res) {
    var userName = req.body.userName;
    var chatRoom = req.body.chatRoom;
    var password = req.body.password;
    var token = req.body.token;
    //hashing the password goes here.
    if (chatRoom && password || chatRoom=='public' && userName) {
        adapter.findChatRoom({ chatRoom: chatRoom }, function (err, chatRoomObject) {
            if (chatRoomObject && !(chatRoomObject._doc.password && chatRoomObject._doc.password != password)) {
                if (!err && chatRoomObject._doc.accessType == 'public') {
                    var chatRooms = serviceHelper.addChatRoom(token, chatRoom, userName);
                    token = jwt.sign({ allowedRooms: chatRooms }, config.secretKey, { expiresIn: 1440 * 60 });
                    res.json({success: true, token: token});
                }
                else {
                    serviceHelper.sendUnAuthorisedResponse(res, 'You cannot proceed further.');
                }
            }
            else
                serviceHelper.sendUnAuthorisedResponse(res, 'Password wrong');
        })
    }
});


router.post('/authenticate', function (req, res) {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        adapter.getUser({ username: username, password: password }, function (err, user) {
            if (err || !user) {
                if (err)
                    console.log('[ERROR] Authentication Error ' + err);
                else
                    console.log('U madafakaa are not registered here. get off of this site.');
                res.send({ success: false, message: 'LOGIN ERROR' });
            }
            else {
                // console.log(user);
                // console.log('only data; ' + user.username);
                var token = jwt.sign({ userId: user._id, userName: user.name, admin: user.admin }, config.secretKey, { expiresIn: 1440 * 60 });
                console.log('[INFO] I just gave someone a token');
                req.session.user = user;
                res.cookie('Authorization', token, {
                    httpOnly: true,
                    maxAge: 1440 * 60 * 1000
                });
                console.log(user);
                res.json({ success: true, token: token, user: user, message: 'Ash with cash.' });
            }
        });
    }
    else {
        res.send('[ERROR] WHAT THE FUCK MATE? @ Authentication Service');
    }
})


module.exports = router;