var model = require('./mongomodel.js');

var newBook;
var newUser;

var getbooks = function(findthis, limit, cb){
    model.Book.find(findthis).limit(limit).exec(function(err,books){
        if(err) console.log(err);
        console.log(books + 'o yes. we did it.. now we will throw it away.');
        cb(books);
    })
    
}

module.exports = {
    getBooks: getbooks
}
