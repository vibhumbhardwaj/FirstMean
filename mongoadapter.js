var model = require('./mongomodel.js');

var newBook;
var newUser;

var getbooks = function (findthis, limit, bc) {
    model.Book.find(findthis).limit(limit).exec(function (err, books) {
        bc(err, books);
    })

}


var getUser = function (findthis, bc) {
    model.User.findOne(findthis, function (err, user) {
        bc(err, user);
    })
}

var saveUserHelper = function (book, user, bc) {
    model.User.findByIdAndUpdate(user._id, user, function (err, updatedUser) {
        if (err)
            console.log('[ERROR] Cannot update the User details to database. was saving this--> ' + user);
        else
            console.log('[INFO] User details got updated to the database.');
        bc(err, book, updateduser);
    });
}

var saveToDB = function (book, user, bc) {
    if (user && !book) {
        saveUserHelper(book, user, bc);
    }
    if (book)
        model.Book.findByIdAndUpdate(book._id, book, function (err, updatedBook) {
            if (err)
                console.log('[ERROR] Cannot update the book details to database. was saving this--> ' + book);
            else
                console.log('[INFO] Book details got updated to the database.');

            if (user) {
                saveUserHelper(book, user, bc);
            }
            else
                bc(err, updatedBook, user);
        });

}

module.exports = {
    getBooks: getbooks,
    getUser: getUser,
    saveToDB: saveToDB
}
