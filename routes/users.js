var express = require('express')
var fs = require('fs-extra')
var router = express.Router()

router.get('/users', function(req, res){
  var users = fs.readJsonSync('./data/users.json', 'utf8');

  res.render('users', {title:'List of users', message:'List of users', users: users})
})
.get('/user/:id', function(req, res){
  var users = fs.readJsonSync('./data/users.json', 'utf8');
  var id = req.params.id
  
  res.render('user', {title:'List of users', message:'List of users', id: id, user: users[id]})
})
.get('/user/:id/delete', function(req, res){
  var dataJson = fs.readJsonSync('./data/users.json', 'utf8');
  if (req.params.id != '') {
    dataJson.splice(req.params.id, 1);
    fs.writeJson('./data/users.json', dataJson, function (err) {
      console.log(err)
      //res.redirect()
    })
  }

  res.redirect('/users') 
})
.post('/user', function(req, res){
  var u = req.body
  
  if(u.name.first && u.name.last && u.age && u.email){
    var dataJson = fs.readJsonSync('./data/users.json', 'utf8');
      
    //Création de l'index 
    var nbr = dataJson.length
    var index = nbr+1
    u.index = index
    dataJson.push(u)
    fs.writeJson('./data/users.json', dataJson, function (err) {
      console.log(err)
      //res.redirect()
    })

    res.redirect('/user/'+nbr)
  }else{
    var response = "Vous devez remplir le formulaire !"
  }

  res.send(response)
})

module.exports = router
