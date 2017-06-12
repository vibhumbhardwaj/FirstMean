var adapter = require('./mongoadapter.js');

var mapUserToBooks = function(books, user){
    books.forEach(function(book) {
        book = mapUserToBook(book, user);
    });
    return books;
}

var mapUserToBook = function(book, user){
    var upVoteStatus = 0;
    if(book.who_has_this){
        book._doc.issued = true;
        book._doc.issuedTo = book.who_has_this.userName;
        if(user && book._doc.who_has_this.userId == user._id)
            book._doc.issuedToCurrentUser = true;
        else
            book._doc.issuedToCurrentUser = false;
    }
    else
        book._doc.issued = false;
    if(user){
        upvoteStatus =  getUpVoteStatus(book, user);
    }

    console.log('[INFO] Got this upvoteStatus--> ' + upVoteStatus + ' <--for book-->' + book.book +' -- '+ book._id);
    book._doc.upvoteStatus = upVoteStatus;
    console.log('[INFO]. Book generated: \n' + book);
    return book;
}
/*
var user = {
    _id: 'vbid',
    name: 'Vibhum',
    username: 'vibhum@hotmail.com',
    password: 'thisispass',
    books_he_has: [],
    books_he_voted: [{bookId: 'id_of_angels_demons', bookName: 'Angels', upVote : false}, {bookId: 'id_of_angels_blabla', bookName: 'Angels', upVote : false}],
    admin: true
}


var book = {
    _id: 'id_of_angels_demons',
    book: 'Angels',
    author: 'Dan brown',
    who_has_this: {},
    points: 5,
    upvoted_by_users: [{userName: 'Vibhum', userId: 'vbid'}],
    downvoted_by_users: []
}

*/

var getPointsAfterDownvote = function(book){
    var points = book.points;
    if(points>0){
        points--;
    }
    return points;
}


var getUpVoteStatus = function(book, user){
    console.log('Getting upvote status for user: ' + user.name);
    var returnval = 0;
    user.books_he_voted.forEach(function(bookFromUser) {
        if(book._doc._id == bookFromUser.bookId){
            if(bookFromUser.upvote)
                returnval =  1;
            else
                returnval = -1;
        }
    });
    return returnval;
}

module.exports = {
    
    mapUserToBooks : mapUserToBooks,
    mapUserToBook : mapUserToBook,
    getUpVoteStatus : getUpVoteStatus
}