var mongomodel = require('./mongomodel.js');

var newBook = new mongomodel.Book({
    book: 'Killing Floor',
    author: 'Lee Child',
    who_has_this: null,
});

var vbUser = {
    name: 'Vibhum',
    username: 'a@a.com',
    password: '123654',
    admin: true,
    books_he_likes: [],
    books_he_has: []
};

var newUser = new mongomodel.User(vbUser);

var updateBook = {
    book: 'Killing Floor',
    author: 'Lee Child',
    who_has_this: {userId: '5933d1d310feaf4a38729553', userName: 'Vibhum'},
    _id: '5933d2d51d402d62d8a7b842'
}
/*
mongomodel.Book.findByIdAndUpdate(updateBook._id, updateBook, function(err, book){
    if (err) throw err;
    //book = updateBook;
    getBooks();

})
*/

/*
newBook.save(function(err){
    if(err) console.error('shit happens. this time happened while saving the book you gave me save into the database.');
    console.log('o ya.');
});
*/
//C for Create
/*
newUser.save(function(err){
    if(err) console.error('shit happens. this time happened while saving the user you gave me save into the database.');
    console.log('o ya.');
});*/

//mongomodel.User.findOne({username: 'a@a.com',})


var readBook = function(){
    mongomodel.Book.find({book: 'Killing Floor'},function(err,books){
        console.log(books[0].who_has_this);
    })
}
readBook();


var resetPoints = function() { // To update all books with points 0;
    mongomodel.Book.find({}, function(err, books){
        books.forEach(function(book) {
            book.update({points: 0}, function(err){
                if(err)console.log('koi na.');
            })
        }, this);
    })
  
}

var useAndThrow = function(){
    mongomodel.User.findByIdAndUpdate('5933d1d310feaf4a38729553', vbUser, function(err, book) {
        console.log('done.');
    });
}

useAndThrow();
// RU D (you know how to delete. don't act like you don't)
var getBooks = function () {
    mongomodel.Book.findOneAndUpdate({ _id : '5923e920d266fb2134746867' },{book:'Doh'}, function (err, data) { // Only find for reading, then you can do .save or .remove the old fashioned way also..
        if (err) console.error("Shit happens. this time while retrieving current books from database.");
        console.log('Books:\n' + data);
        //data[0].author = 'DANGIT';
        //data[0].save(function(err){
         //   if(err)console.log('shit.');
       // })
    });
}
//getBooks();


/* Apparently, you cannot set the data which is not present in the schema So this saves nothing but _id and _v


var notBook = new mongomodel.Book({
    name: "demons",
    comment: "hey. waddup"
});

notBook.save(function(err){
    if(err) console.error('well sorry.');
    getBooks();
})*/
