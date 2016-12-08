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

// Create a schema
var userSchema = new Schema({
    name: String,
    pseudo: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    have: [{}],
    unread: [{}],
    read: [{}],
    created_at: Date,
    updated_at: Date  
});

// Create a model using userSchema
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;