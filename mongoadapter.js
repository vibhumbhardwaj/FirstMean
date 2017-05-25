var model = require('./mongomodel.js');

var newBook;
var newUser;

var getbooks = function(findthis, limit, bc){
    model.Book.find(findthis).limit(limit).exec(function(err,books){
       // if(err) console.log(err);
        bc(err, books);
    })
}

var getbookdetail = function(findthisid, bc){
    model.book.findbyid(findthisid, function(err,thebook){
        bc(err, thebook);
    })
}

module.exports = {
    getBooks: getbooks,
    getBookById: getbookdetail
}
