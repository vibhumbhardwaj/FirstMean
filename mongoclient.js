var mongomodel = require('./mongodb.js');

var newBook = new mongomodel.Book({
    book: 'killing floor',
    author: 'Lee Child',
    who_has_this: null
});

/*
newBook.save(function(err){
    if(err) console.error('shit happens. this time happened while saving the book you gave me save into the database.');
    console.log('o ya.');
});
*/

var getBooks = function () {
    mongomodel.Book.find({ _id : '5923e920d266fb2134746867' }, function (err, data) {
        if (err) console.error("Shit happens. this time while retrieving current books from database.");
        console.log('Books:\n' + data[0].book);
    });
}
getBooks();


/* Apparently, you cannot set the data which is not present in the schema So this saves nothing but _id and _v


var notBook = new mongomodel.Book({
    name: "demons",
    comment: "hey. waddup"
});

notBook.save(function(err){
    if(err) console.error('well sorry.');
    getBooks();
})*/
