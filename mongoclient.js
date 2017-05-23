var mongomodel = require('./mongodb.js');

var AngelsAndDemons = new mongomodel.Book({
    book: 'killing floor',
    author: 'Lee Child',
    who_has_this: null
});

/*
AngelsAndDemons.save(function(err){
    if(err) console.error('shit happens. this time happened while saving the book you gave me save into the database.');
    console.log('o ya.');
});
*/

var getBooks = mongomodel.Book.find(function(err,data){
    if (err) console.error("Shit happens. this time while retrieving current books from database.");
    console.log('Books:\n' + data);
});

var notBook = new mongomodel.Book({
    name: "demons",
    comment: "hey. waddup"
});

notBook.save(function(err){
    if(err) console.error('well sorry.');
    getBooks();
})