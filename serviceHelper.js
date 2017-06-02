var adapter = require('./mongoadapter.js');

var mapUserToBooks = function(books, user){
    books.forEach(function(book) {
        book = mapUserToBook(book, user);
    });
    return books;
}

var mapUserToBook = function(book, user){
    if(book.who_has_this){
        book.issued = true;
        book.issuedTo = book.who_has_this.userName;
    }
    else
        book.issued = false;
    
    var upVoteStatus =  getUpVoteStatus(book, user);
}

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
    upvoded_by_users: [{userName: 'Vibhum', userId: 'vbid'}],
    downvoted_by_users: []
}



var getUpVoteStatus = function(book, user){
    var returnval = 0;
    user.books_he_voted.forEach(function(bookFromUser) {
        if(book._id == bookFromUser.bookId){
            if(bookFromUser.upVote)
                returnval =  1;
            else
                returnval = -1;
        }
    });
    return returnval;
}