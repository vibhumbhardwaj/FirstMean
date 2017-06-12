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

var getBookDetail = function (findthis, bc) {
    model.Book.findById(findthis, function (err, book) {
        bc(err, book);
    })
}

var saveUserOnly = function (book, user, bc) {
    model.User.findByIdAndUpdate(user._id, user, function (err, updatedUser) {
        if (err) {
            console.log('[ERROR] Cannot update the User details to database. was saving this--> ' + user);
            bc(err, book, updatedUser);
        }
        else {
            console.log('[INFO] User details got updated to the database.');
            bc(err, book, updatedUser);
        }
    });
}

var saveToDB = function (book, user, bc) {
    if (user && !book) {
        saveUserOnly(book, user, bc);
    }
    else if (book)
        model.Book.findByIdAndUpdate(book._id,book, function (err, updatedBook) {
            if (err) {
                console.log('[ERROR] Cannot update the book details to database. was saving this--> ' + book);
                bc(err, updatedBook, user);
            }
            else {
                console.log('[INFO] Book details got updated to the database.');

                if (user) {
                    saveUserOnly(book, user, bc);
                }
                else
                    bc(err, updatedBook, user);
            }
        });

}

module.exports = {
    getBooks: getbooks,
    getUser: getUser,
    getBookDetail: getBookDetail,
    saveToDB: saveToDB
}
