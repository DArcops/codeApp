var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res){
  res.render('login/index');
});

router.get('/login/test',function(req,res){
  res.render('login/test');
});

router.post('/welcome',function(req,res){
  console.log(req.body);
  var user_name = req.body.user_name;
  res.render('user/index',{nombre:user_name});
});

module.exports = router;
