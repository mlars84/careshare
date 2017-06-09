const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const careProfileModel = require('../models/careprofile.model');
const userModel = require('../models/user.model');

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
  let newCareProfile = careProfileModel(req.body);
  if (newCareProfile.userCreated == req.user._id){
    console.log('newCareProfile =>', newCareProfile);
    newCareProfile.save().then(function(data, err){
      if (data) {
        console.log('data', data);
        res.sendStatus(200);
      } else {
        console.log('err', err);
        res.sendStatus(500);
      }
    });
  } else {
    console.log('user does not have access to');
    console.log(newCareProfile.userCreated, req.user._id);
    res.sendStatus(403);
  }
}); //end addProfile

//GET to get specific user profiles
router.get('/getUserProfiles', function(req, res) {
  console.log('Get specific user Profiles');
  careProfileModel.find().then(function(data, err) {
    // console.log('data =>', data);
    if(data){
      res.send(data);
    } else{
      console.log('err', err);
      res.sendStatus(500);
    }
  });
}); //end getUserProfiles

//DELETE to remove a profile
router.delete('/deleteProfile', function(req, res) {
  console.log('Delete a care profile');
  let idToDelete = req.query.id;
  console.log('idToDelete =>', idToDelete);
  careProfileModel.remove({_id: idToDelete}).then(function(data, err) {
    if (data){
      res.sendStatus(200);
    } else {
      console.log('err', err);
      res.sendStatus(500);
    }
  });
}); //end deleteProfile

router.put('/updateProfile', function(req, res) {

  console.log('Updating Profile', req.body);
  let newCareProfile = careProfileModel(req.body);
  console.log('newCareProfile =>', newCareProfile);
  careProfileModel.findByIdAndUpdate(req.body._id, {$set: {name: req.body.name, age: req.body.age, basicInfo: req.body.basicInfo, careInfo: req.body.careInfo}}, function(err){
    if (err) {
      console.log('err', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}); //end updateProfile

//PUT to remove a user object from careProfile
router.put('/unShare', function(req, res) {
  console.log('in unShare post route =>', 'profileId =>', req.body.currentProfile._id, 'profileToUnshare', req.body.profileToUnshare);
  careProfileModel.update({_id: req.body.currentProfile._id}, {$pull: {'sharedWith': {userId: req.body.profileToUnshare.userId, username: req.body.profileToUnshare.username}}}, function(err, result) {
    if ('err', err){
      res.sendStatus(500);
    } else if(!result){
      res.sendStatus(409);
    } else {
      res.sendStatus(205);
    }
  });
}); //end unShare PUT

module.exports = router;
