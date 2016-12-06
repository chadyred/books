var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
    pseudo: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  
});

// Create a model using userSchema
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;