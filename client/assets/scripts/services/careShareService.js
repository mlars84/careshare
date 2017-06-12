myApp.service('careShareService', ['$http', '$location', function($http, $location) {
  const vm = this;
  vm.users = {list: []};
  vm.profiles = {names: []};
  vm.careShares = {shares: []};

  vm.checkUserSession = function() {
    $http.get('/user').then(function(response) {
      if(response.data.username) {
        // user has a curret session on the server
        vm.userName = response.data.username;
        vm.userId = response.data._id;
        
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }); //end user session check
  }; //end checkUserSession
  vm.checkUserSession();

  //function to get list of authenticated users from DB
  vm.getUsers = function() {
    vm.checkUserSession();
    
    $http({
      method: 'GET',
      url: '/careshare/getUsers'
    }).then(function(res) {
      
      vm.users.list = [];
      
      for (var i = 0; i < res.data.length; i++) {
        
        if (res.data[i].username !== vm.userName) {
          vm.users.list.push(res.data[i]);
          
        } //end if
      } //end for
    });
  }; //end getUsers

  //function to bring in just profile names from database and id of user that created them
  vm.getProfilesToShare = function() {
    
    $http({
      method: 'GET',
      url: '/careshare/getProfilesToShare'
    }).then(function(res) {
      
      vm.profiles.names = [];
      vm.getCareShares(res.data);
      for (var i = 0; i < res.data.length; i++) {
        
        if(res.data[i].userCreated === vm.userId){
          vm.profiles.names.push(res.data[i]);
        }
      }
    }); //end http GET
  }; //end getProfilesToShare

  vm.getProfilesToShare();

  //function to return to profile
  vm.returnToProfile = function() {
    
    $location.path('/profile');
    vm.clearUsers();
  }; // end returnToProfile

  //function to clearUsers from dropdown
  vm.clearUsers = function() {
    vm.users.list = [];
  }; //end clearUsers

  //function to share a profile with another user
  vm.shareProfile = function(user, profile) {
    
    
    const careShareToSend = {userToShareWith: user, careProfileToShare: profile};
    
    $http({
      method: 'PUT',
      url: '/careshare/shareProfile',
      data: careShareToSend
    }).then(function(res) {
      
      swal('' + profile.name + ' has been shared with ' + user.username + '!');
    });
  }; // end shareProfilelo

  //function to append the user's careshares to careshare.html
  vm.getCareShares = function(allProfiles) {
    
    
    vm.careShares.shares = [];
    for (var i = 0; i < allProfiles.length; i++) {
      
      var sharedWithArray = allProfiles[i].sharedWith;
      for (var j = 0; j < sharedWithArray.length; j++) {
        
        if(sharedWithArray[j].userId == vm.userId) {
          
          vm.careShares.shares.push(allProfiles[i]);
          
        } else {
          
        }
      }
    }
  }; //end getCareShares
}]);
