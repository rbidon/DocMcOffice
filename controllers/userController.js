const express = require('express')
const bcrypt = require('bcrypt')

// we need our User model that stores the schema
const User = require('../models/users')

const router = express.Router()

router.get('/register', (req, res) => {
  res.render('users/register.ejs')
});

router.post('/register', (req, res) => {
    // we need to encrypt our passwords
    // we can use the bcrypt library for this
    // we need to import the libary at the top of our file
    // first we need to generate salt
    const salt = bcrypt.genSaltSync(10)
    // salt is a random garbage we add to our encrypted passwords
    // the number we pass to genSaltSync determines how much salt
    // we are adding, the higher the number the more secure, but the longer it takes
    // now we're going to generate the actual hashed password
    // console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)
  
    // first lets see if somebody else already has this username
    User.findOne({username: req.body.username}, (err, userExists) => {
      if(userExists) {
        console.log("Username is taken");
        res.send(`${userExists} is taken`)
      } else {
        User.create(req.body, (err, createdUser) => {
          console.log(createdUser)
          // res.send('user created')
          req.session.currentUser = createdUser
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
    res.redirect('/')
  })
module.exports = router;