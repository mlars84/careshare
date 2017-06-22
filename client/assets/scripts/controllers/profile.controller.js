myApp.controller('profileController', ['$scope', '$http', '$location', 'profileService', function($scope, $http, $location, profileService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  const vm = this;

  vm.userProfiles = [];
  vm.pix = '';

  // function to use filestack to add image url to DB
  vm.showPicker = function() {
    var client = filestack.init('ArXNtpO4Rwsqv9KTeHucgz');
    client.pick({}).then(function(result) {
      vm.pix = {url: result.filesUploaded[0].url};
    });
  }; //end showPicker

  //$scope for filestack
  $scope.nameIn ={
    imageUrl: 'Profile Name'
  };

  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
    if(response.data.username) {
      // user has a curret session on the server
      vm.userName = response.data.username;
      vm.userId = response.data._id;
      vm.getUserProfiles();
    } else {
      // user has no session, bounce them back to the login page
      $location.path("/home");
    }
  }); //end user session check

  //Passport function to logout user
  vm.logout = function() {
    $http.get('/user/logout').then(function(res) {
      swal('Thanks for CareSharing!');
      $location.path("/home");
    });
  }; //end logout

  //function to add a profile once a user is authenticated
  vm.addProfile = function() {
    //object to send to DB via user.js route from inputs on DOM
    var profileToSend = {
      imageUrl: vm.pix.url,
      name: vm.nameIn,
      age: vm.ageIn,
      basicInfo: vm.basicInfoIn,
      careInfo: vm.careInfoIn,
      emergencyContacts: vm.emergencyContactsIn,
      userCreated: vm.userId,
      sharedWith: []
    };
    $http({
      method: 'POST',
      url: '/user/addProfile',
      data: profileToSend
    }).then(function(res) {
      vm.clearInputs();
      vm.getUserProfiles();
      swal("Good job!", "CareProfile created! Scroll down to check it out.", "success");
    });
  }; //end addProfile

  //function to clear the inputs after submit button is clicked
  vm.clearInputs = function() {
    vm.imageUrl = '';
    vm.nameIn = '';
    vm.ageIn = '';
    vm.basicInfoIn = '';
    vm.careInfoIn = '';
    vm.emergencyContactsIn = '';
  }; //end clearInputs

  //function to get specific user profiles
  vm.getUserProfiles = function() {
    $http({
      method: 'GET',
      url: '/user/getUserProfiles'
    }).then(function(res) {
      vm.userProfiles = [];
      for (var i = 0; i < res.data.length; i++) {
        if(res.data[i].userCreated === vm.userId){
          vm.userProfiles.push(res.data[i]);
        }
      }
    });
  }; //end getUserProfiles

  //function to update the profile after the user as edited it
  vm.updateProfile = function(profile) {
    $http({
      method: 'PUT',
      url: '/user/updateProfile',
      data: profile
    }).then(function(res) {
      vm.getUserProfiles();
      swal('' + profile.name + ' has been updated!');
    });
  }; //end editProfile

  //function to share the profile with another user
  vm.shareProfile = function() {
    $location.path('/careshare');
  }; //end shareProfile

  //function to unshare a profile based on selectedSharedWith from profile.html
  vm.unShare = function(profileToUnshare, currentProfile) {
    swal({
      title: "Are you sure?",
      text: "This will unshare " + currentProfile.name +" with " + profileToUnshare.username + "!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, unshare!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm) {
        swal("Unshared!", "No worries, you can always CareShare again if you'd like.", "success");
        var objectToSend = {profileToUnshare: profileToUnshare, currentProfile: currentProfile};
        $http({
          method: 'PUT',
          url: '/user/unShare',
          data: objectToSend
        }).then(function(res) {
          vm.getUserProfiles();
        });
      } else {
        swal("Cancelled", "" + profileToUnshare.username + " still has access to " + currentProfile.name + " :)", "error");
      }
    });
  }; //end unShare

  //function to delete a careprofile from the database
  vm.deleteProfile = function(id, profileToUnshare, currentProfile) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover " + currentProfile.name + "'s CareProfile!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm) {
        swal("Deleted!", "" + currentProfile.name + " has been deleted.", "success");
        $http({
          method: 'DELETE', url: '/user/deleteProfile',
          params: { id: id }
        }).then(function(res) {
          vm.getUserProfiles();
        });
      } else {
        swal("Cancelled", "" + currentProfile.name + "'s CareProfile lives on :)", "error");
      }
    });
  }; //end devareProfile
}]); //end profileController
