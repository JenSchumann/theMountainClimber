const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/login', (req, res, next) =>{

  res.render('users/login.ejs', {message: req.session.message || ''})
})



router.get('/register', (req, res) => {
  res.render('users/register.ejs', {})
})

router.post('/login', (req, res) => {

  User.findOne({username: req.body.username}, (err, user) => {

      if(user){
      //to command the comparison of hash and form password
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = '';
                req.session.username = req.body.username;
                req.session.logged   = true;
                console.log(req.session, req.body)

                res.redirect('/climbers/new.ejs')
            } else {
              console.log('else in bcrypt compare')
              req.session.message = 'Username or password are incorrect';
              res.redirect('/sessions/login')
            }

      } else {
          req.session.message = 'Username or password are incorrect';
          res.redirect('/sessions/login')
      }
    });
})



router.post('/register', (req, res) => {

  // hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // db entry object creation
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash

  // to include pw in database as encrypted
  User.create(userDbEntry, (err, user) => {
    console.log(user)

    // set up the session
    req.session.username = user.username;
    req.session.logged   = true;
    res.redirect('/climbers')
  });
})


router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  })
})




// export controller
module.exports = router;
