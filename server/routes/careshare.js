const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const careProfileModel = require('../models/careprofile.model');
const userModel = require('../models/user.model');
const nodemailer = require('nodemailer');

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
  console.log('req.body =>', req.body);
  console.log('user to share with =>', 'name:', req.body.userToShareWith.username, 'id:', req.body.userToShareWith._id, 'currently logged in user =>', req.user._id, 'careProfileId =>', req.body.careProfileToShare._id, 'user who created profile =>', req.body.careProfileToShare.userCreated);
  if(req.body.careProfileToShare.userCreated == req.user._id){ careProfileModel.findByIdAndUpdate({_id: req.body.careProfileToShare._id}, {$addToSet: {sharedWith: {username: req.body.userToShareWith.username, userId: req.body.userToShareWith._id}}}, function(err){
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

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'http://localhost:5000/',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'matt.a.larson@gmailc.com',
        pass: 'nodemailer'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"CareShare" <matt.a.larson@gmail.com>', // sender address
    to: 'matt.a.larson@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

module.exports = router;
