const express = require('express')
const bcrypt = require('bcrypt')

// we need our User model that stores the schema
const User = require('../models/users')

const router = express.Router()

router.get('/register', (req, res) => {
  res.render('users/register.ejs')
});
// Storaging the register information
router.post('/register', (req, res) => {
    // we need to import the bcrypt libary at the top of our file that will encrypt the passwords in mongoDB Atlas
    // first we need to generate salt
    // that encrypted the password with specifc characters 
    const salt = bcrypt.genSaltSync(12)
    // console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)
  
    // first lets see if somebody else already has this username
    User.findOne({username: req.body.username}, (err, userTaken) => {
      if(userTaken) {
        console.log(`${userTaken} is taken`);
        res.send(`${userTaken} is taken`)
      } else {
        User.create(req.body, (err, newUser) => {
          console.log(newUser)
          // res.send('user created')
          req.session.newUser = newUser;
          res.redirect('/patient')
        })
      }
    })
  })
  
  router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
  })
  
  router.post('/signin', (req, res) => {
    // we need to get the user with that username
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (foundUser) {
        // if they do exist, we need compare their passwords
        // we can compare passwords using bcrypt's compareSync function
        const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
        // compareSync returns true if they match
        // and false if they don't match
        // if the passwords match, log then in
        if (validLogin) {
          req.session.currentUser = foundUser
          // we are letting session know
          // that we have logged in
          res.redirect('/patient')
        } else {
          // if they don't match, send a message
          res.send('Invalid username or password')
        }
      } else {
        // if they don't exist, we need to send a message
        res.send('Invalid username or password')
      }
    })
  })
  
  // DESTROY session route
  router.get('/signout', (req, res) => {
    // this destroy's the session
    req.session.destroy()
    //redirect to the homepage
    res.redirect('/')
  })
module.exports = router;