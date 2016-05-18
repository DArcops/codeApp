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
  User.find({"password":req.body.password},function(err,data){
    if(!err)
      console.log(data);
  });
});

router.get('/register',function(req,res){
  res.render('register/index');
});



router.post('/welcome',function(req,res){
  var fields = req.body;

  var data = {
    name    : req.body.user_name,
    email   : req.body.email,
    password: req.body.password
  };

  User.find({"email":fields.email}, function(err,data_mongo){
    console.log(data);
    if(err)
      cosole.log(err);
    else {
      var response = data_mongo;

      if(!response.length) {
          console.log("este correo es nuevo");

          var usuario = new User(data);

          usuario.save(function(err){
            if(!err){
              res.render('user/index',{nombre :usuario.name});
            } else {
              res.render('error');
              console.log(err);
            }
        });
      }
      else {
        console.log("ya hay un correo asi");
        res.render('register/index',{email_used:true});
      }
    }
  });


});

module.exports = router;
