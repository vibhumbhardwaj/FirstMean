var model = require('./mongomodel.js');

var newBook;
var newUser;

var getbooks = function(findthis, limit, bc){
    model.Book.find(findthis).limit(limit).exec(function(err,books){
        bc(err, books);
    })
    
}


var getUser = function(findthis, bc){
    model.User.findOne(findthis,function(err,user){
        bc(err, user);
    })
}

module.exports = {
    getBooks: getbooks,
    getUser: getUser
}
