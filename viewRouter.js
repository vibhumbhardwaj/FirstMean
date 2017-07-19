var express = require('express');
var shared = require('./static/shared');

router = express.Router(); 

router.use(function(req,res,next){
    console.log('[INFO]@VIEW ' + req.sessionID + ' @ time: ' + new Date().toLocaleTimeString() + ' accessed this page:  ' + req.method +' --> ' + req.url.toString());
    console.log(req.session.user);
    next();
})



router.get('/',function(req,res){
    res.render('login.html');
});

router.get('/books', function (req, res) {
    res.render('index.html');
});

router.get('/books/:id', function (req, res) {
    //shared.setVariable(req.params.id);
    res.render('book.html', {bookId: "" + req.params.id});
})

router.get('/solve', function (req, res) {
    res.render('okay.html');
});

router.get('/login', function(req,res){
    res.render('login.html');
});

router.get('/yoman', function(req, res){
    res.render('amazon.html');
});

router.get('/chat', function(req, res){
    res.render('chat.html');
})

module.exports = router;