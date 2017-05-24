module.exports = function (express, app) {
    var apiRouter = express.Router();
    var adapter = require('./mongoadapter');

    var findthis = {};

    apiRouter.get('/getBooks', function (req, res) {
        adapter.getBooks(findthis, parseInt(req.query.v), function (books) {
            console.log('\n\n\nAfter Catching: ' + books);
            res.json(books);
        });
    });
    console.log('ok');
    app.use('/gateway', apiRouter);
}
//module.exports = apiRouter;
