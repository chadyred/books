var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema for book
var bookSchema = new Schema({
    title: String,
    isbn: {type: String, required: true, unique: true},
    created_at: Date,
    updated_at: Date
});

// Create a model using userSchema
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;