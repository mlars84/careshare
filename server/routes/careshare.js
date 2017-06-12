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
        return 
    }
    
});

module.exports = router;
