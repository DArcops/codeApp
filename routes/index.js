var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require ('mongoose');
var User         = require('../models/user');
var router       = express.Router();


var app = express();
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loco', function(req, res, next) {
  res.render('login/loco')
})

router.get('/bfs_tutorial/2',function(req,res){
  res.render('tutorial/bfs2');
});

router.get('/dashboard/p',function(req,res,next){
  res.render('./login/loco')
});

router.get('/new_course',function(req,res,next){
  res.render('./course/new2')
});

router.get('/new_lesson',function(req,res,next){
  res.render('./lesson/new')
});

// router.get('/dashboard/:id',function(req,res,next){
//   res.send('que pedo '+req.params.id)
// });


router.get('/login',function(req,res){
  res.render('login/index');
});

router.post('/validate',function(req,res){
  console.log(req);
  User.find({"email":req.body.email},function(err,data){
    if(!err){
      if(data[0].password == req.body.password){
        var user = {
          name : data[0].name,
          email: data[0].email
        };
        res.render('user/index',{nombre :user.name});

      }
      else{
        console.log("db : "+data.password);
        console.log("req: "+req.body.password);
        res.render('login/index');
      }
    }

  });
});

router.get('/register',function(req,res){
  res.render('register/index');
});

router.get('/bfs_tutorial',function(req,res){
  res.render('tutorial/bfs');
});



router.post('/welcome',function(req,res){
  var fields = req.body;
  var session = req.cookies.sessionid;


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
