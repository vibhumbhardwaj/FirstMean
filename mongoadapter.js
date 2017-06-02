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


var upVoteBook = function(bookId, userId, username, bc){
    model.Book.findById(bookId,function(err, book){
        var upvotes = book.points++;
        var upvotedBy = book.upvoted_by_users.push({username: username, userId: userId});
        book.save({points: upvotes, }, function(err, bookUpdate){
            if(err){
                console.log('[ERROR] Issue saving the updated points to the book. Points: ' + upvotes)
            }
            bc(bookUpdate);
        })

    })
}

module.exports = {
    getBooks: getbooks,
    getUser: getUser
}
