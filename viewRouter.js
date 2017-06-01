var express = require('express');

router = express.Router();

router.get('/',function(req,res){
    res.render('login.html');
});

router.get('/books', function (req, res) {
    res.render('index.html');
});

router.get('/solve', function (req, res) {
    res.render('okay.html');
});

router.get('/login', function(req,res){
    res.render('login.html');
})

module.exports = router;