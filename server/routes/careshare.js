const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const careProfileModel = require('../models/careprofile.model');
const userModel = require('../models/user.model');

//GET to get user list from DB to profile.html
router.get('/getUsers', function(req, res) {
  userModel.find({ username: { $ne: req.user.username }}).then(function(data) {
    res.send(data);
  });
}); //end getUsers route

router.get('/getProfilesToShare', function(req, res) {
  careProfileModel.find({name: {$ne: req.body.name}}).then(function(data) {
    res.send(data);
  });
}); //end getProfilesToShare route

//PUT to add a user to the careprofile "sharedWith" array
router.put('/shareProfile', function(req, res) {
  if(req.body.careProfileToShare.userCreated == req.user._id){ careProfileModel.findByIdAndUpdate({_id: req.body.careProfileToShare._id}, {$addToSet: {sharedWith: {username: req.body.userToShareWith.username, userId: req.body.userToShareWith._id}}}, function(err){
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else{
  }
}); //end shareProfile PUT

module.exports = router;
