module.exports = function (express, app) {
    var apiRouter = express.Router();
    var adapter = require('./mongoadapter');

    var findthis, bookId

    apiRouter.get('/books/getBooks', function (req, res) {
        if(req.query.q) findthis = {book: req.query.q};
        else findthis = {};
        adapter.getBooks(findthis, parseInt(req.query.v), function (err,books) {
            if(err) console.log('shit happened at backend getbooks()');
            res.json(books);
        });
    });
    console.log('ok');
    app.use('/gateway', apiRouter);

    apiRouter.get('/books/:id', function(req, res){
        bookId = req.params.id;
        adapter.getBookById(bookId, function(err, bookdata){
            if(err) console.log('shit happened at backend getbookdetail()');
            res.json(bookdata);
        })
    })
}
//module.exports = apiRouter;