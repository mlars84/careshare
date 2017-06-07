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

router.get('/getProfilesToShare', function(req, res) {
  console.log('getProfilesToShare from DB');
  careProfileModel.find({name: {$ne: req.body.name}}).then(function(data) {
    console.log('careprofile data =>', data);
    res.send(data);
  });
}); //end getProfilesToShare route

//PUT to add a user to the careprofile "sharedWith" array
router.put('/shareProfile', function(req, res) {
  console.log('user to share with =>', req.body.userId, 'currently logged in user =>', req.user._id, 'careProfileId =>', req.body.careProfile._id, 'user who created profile =>', req.body.careProfile.userCreated);

  if(req.body.careProfile.userCreated == req.user._id){
    careProfileModel.update({_id: req.body.careProfile._id}, {$addToSet: {sharedWith: req.body.userId}}, function(err){
      if (err) {
        console.log('err', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else{
    console.log('userCreated and sessionID NOT EQUAL');
  }
}); //end shareProfile PUT

//DELTE route to unshare with a user
// router.delete('/unShareProfile', function(req, res) {
//   console.log('in unShareProfile route');
//   careProfileModel.remove();
// });

module.exports = router;
