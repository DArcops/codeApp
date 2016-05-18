var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require ('mongoose');
var User         = require('../models/user');
var router       = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res){
  res.render('login/index');
});

router.post('/validate',function(req,res){
  
});

router.get('/register',function(req,res){
  res.render('register/index');
});



router.post('/welcome',function(req,res){
  var data = {
    name    : req.body.user_name,
    email   : req.body.email,
    password: req.body.password
  };


  var usuario = new User(data);

  usuario.save(function(err){
    if(!err){
      res.render('user/index',{nombre :usuario.name});
    } else {
      res.render('error');
      console.log(err);
    }
  });

});

module.exports = router;
