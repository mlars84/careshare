myApp.service('careShareService', ['$http', '$location', function($http, $location) {
  var vm = this;
  vm.users = {list: []};
  vm.profiles = {names: []};

  vm.checkUserSession = function() {
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            vm.userName = response.data.username;
            vm.userId = response.data._id;
            console.log('User Data: ', vm.userName, vm.userId);
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
    console.log('getting all other users list');
    $http({
      method: 'GET',
      url: '/careshare/getUsers'
    }).then(function(res) {
      console.log(res.data);
      vm.users.list = [];
      console.log(vm.users.list);
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i].username, vm.userName);
        if (res.data[i].username !== vm.userName) {
          vm.users.list.push(res.data[i]);
          console.log(vm.users.list);
        } //end if
      } //end for
    });
  }; //end getUsers

  //function to bring in just profile names from database and id of user that created them
  vm.getProfilesToShare = function() {
    console.log('in getProfilesToShare');
    $http({
      method: 'GET',
      url: '/careshare/getProfilesToShare'
    }).then(function(res) {
      console.log('res.data =>', res.data);
      vm.profiles.names = [];
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i].userCreated);
        if(res.data[i].userCreated === vm.userId){
          vm.profiles.names.push(res.data[i]);
        }
      }
    }); //end http GET
  }; //end getProfilesToShare

  vm.getProfilesToShare();
  console.log(vm.profiles.names.userCreated);

  //function to return to profile
  vm.returnToProfile = function() {
    console.log('back to profile button clicked!');
    $location.path('/profile');
    vm.clearUsers();
  }; // end returnToProfile

  //function to clearUsers from dropdown
  vm.clearUsers = function() {
    vm.users.list = [];
  }; //end clearUsers

  //function to share a profile with another user
  vm.shareProfile = function(user, profile) {
    console.log('share button clicked!');
    console.log(user, profile);
    var careShareToSend = {userId: user, careProfile: profile};
    $http({
      method: 'PUT',
      url: '/careshare/shareProfile',
      data: careShareToSend
    }).then(function(res) {
      console.log(res.data);
    });
  }; // end shareProfile

}]);
