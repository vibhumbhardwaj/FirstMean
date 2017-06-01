var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect(config.connectionString);
var db = mongoose.connection;

db.addListener('error',function(err){
    console.error(err);
    console.error('shit happened at Database Level');
    //console.log(err);
});

db.addListener('open',function(){
    console.log('we\'re up buddy.');
});
var Schema = mongoose.Schema;

var schemaForUsers = new Schema({
    name: String,
    username: {type: String, unique: true},
    password: String,
    books_he_has: [String],
    books_he_likes: [String],
    books_he_dislikes: [String],
    admin: Boolean
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
