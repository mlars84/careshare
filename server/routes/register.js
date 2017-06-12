const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/user.model');
const path = require('path');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
    Users.create(req.body, function(err, post) {
         if(err) {
           // next() here would continue on and route to routes/index.js
           next(err);
         } else {
          // route a new express request for GET '/'
          res.sendStatus(200);
         }
    });
});


module.exports = router;
