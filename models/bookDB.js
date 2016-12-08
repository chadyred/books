/* Please configure /private/configDB */
var mongoose = require('../private/configDB');
var db = mongoose.connection;

db.on('error', function(error){
   console.log('**** WARNING ! Impossible de se connecter à la base ! ****') ;
   console.log(error);
});

db.on('open', function(){
   console.log('Connexion à la base réussie !') ;   
});

var Schema = mongoose.Schema;

// Create a schema for book
var bookSchema = new Schema({
    title: {type: String, required: true,  unique: false},
    ean:   {type: String, required: true,  unique: true},
    asin:  {type: String, required: false, unique: false},
    detailPageURL: {type: String, required: false, unique: false},
    thumbEmailUrl: {type: String, required: false, unique: false},
    bigEmailUrl: {type: String, required: false, unique: false},
    created_at: Date,
    updated_at: Date
});

// Create a model using userSchema
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;