var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbone/');
var db = mongoose.connection;

db.addListener('error',function(){
    console.error('shit happens');
});

db.addListener('open',function(){
    console.log('we\'re up buddy.');
});
var Schema = mongoose.Schema;

var schemaForUsers = new Schema({
    name: String,
    username: String,
    password: String,
    books_he_has: [String],
    books_he_likes: [String],
    books_he_dislikes: [String]
});

var schemaForBooks = new Schema({
    book: String,
    author: String,
    who_has_this: String,
    points: Number,
    upvoded_by_users: [String],
    downvoted_by_users: [String]
});

var Book = mongoose.model('Book', schemaForBooks);
var User = mongoose.model('User', schemaForUsers);

module.exports = {
    User: User,
    Book: Book
};