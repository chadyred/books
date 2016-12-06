var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
    name: String,
    pseudo: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    unread: [{}],
    read: [{}]

  
});

// Create a model using userSchema
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;