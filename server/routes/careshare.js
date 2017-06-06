var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var careProfileModel = require('../models/careprofile.model');
var userModel = require('../models/user.model');

//GET to get user list from DB to profile.html
router.get('/getUsers', function(req, res) {
  console.log('Getting list of users from DB');
  console.log('req.user', req.user);
  userModel.find({ username: { $ne: req.user.username }}).then(function(data) {
    console.log('user data =>', data);
    res.send(data);
  });
}); //end getUsers route

// route.get('/getProfilesToShare', function(req, res) {
//   console.log('getProfilesToShare from DB');
//   careProfileModel.find({name: {$ne: req.careprofile.name}}).then(function(data) {
//     console.log('data', data);
//     res.send(data);
//   });
// }); //end getProfilesToShare route

module.exports = router;
