const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const careProfileModel = require('../models/careprofile.model');
const userModel = require('../models/user.model');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  req.logOut();
  res.sendStatus(200);
});

//POST to add a "Care Profile" to the database
router.post('/addProfile', function(req, res) {
  let newCareProfile = careProfileModel(req.body);
  if (newCareProfile.userCreated == req.user._id){
    newCareProfile.save().then(function(data, err){
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  } else {


    res.sendStatus(403);
  }
}); //end addProfile

//GET to get specific user profiles
router.get('/getUserProfiles', function(req, res) {
  careProfileModel.find().then(function(data, err) {
    //
    if(data){
      res.send(data);
    } else{
      res.sendStatus(500);
    }
  });
}); //end getUserProfiles

//DELETE to remove a profile
router.delete('/deleteProfile', function(req, res) {
  let idToDelete = req.query.id;
  careProfileModel.remove({_id: idToDelete}).then(function(data, err) {
    if (data){
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
}); //end deleteProfile

router.put('/updateProfile', function(req, res) {
  let newCareProfile = careProfileModel(req.body);
  careProfileModel.findByIdAndUpdate(req.body._id, {$set: {name: req.body.name, age: req.body.age, basicInfo: req.body.basicInfo, careInfo: req.body.careInfo, emergencyContacts: req.body.emergencyContacts}}, function(err){
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}); //end updateProfile

//PUT to remove a user object from careProfile
router.put('/unShare', function(req, res) {  
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
