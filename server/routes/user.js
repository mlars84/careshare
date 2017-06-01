var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var careProfileModel = require('../models/careprofile.model');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//POST to add a "Care Profile" to the database
router.post('/addProfile', function(req, res) {
  console.log('Adding Profile', req.body);
  var newCareProfile = careProfileModel(req.body);
  console.log('newCareProfile =>', newCareProfile);
  newCareProfile.save().then(function(){
    res.sendStatus(200);
  });
}); //end addProfile

//GET to get all user profiles
router.get('/getAllProfiles', function(req, res) {
  console.log('Get all user Profiles');
  careProfileModel.find().then(function(data) {
      console.log('data =>', data);
      res.send(data);
  });
}); //end getAllProfiles

//DELETE to remove a profile
router.delete('/deleteProfile', function(req, res) {
  console.log('Delete a care profile');
  var idToDelete = req.query.id;
  console.log('idToDelete =>', idToDelete);
  careProfileModel.remove({_id: idToDelete}).then(function() {
    res.sendStatus(204);
  });
}); //end deleteProfile

router.put('/editProfile', function(req, res) {
  console.log('Edit a care profile');
  var profileToEdit = req.body;
  console.log(profileToEdit);
  careProfileModel.update(req.body).then(function() {
    res.sendStatus(200);
  });
}); //end editProfile


module.exports = router;
