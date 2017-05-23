var mongomodel = require('./mongomodel.js');

var newBook = new mongomodel.Book({
    book: 'killing floor',
    author: 'Lee Child',
    who_has_this: null,

});

//C for Create
newBook.save(function(err){
    if(err) console.error('shit happens. this time happened while saving the book you gave me save into the database.');
    console.log('o ya.');
});





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
