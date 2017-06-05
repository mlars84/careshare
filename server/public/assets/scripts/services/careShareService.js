myApp.service('careShareService', ['$http', '$location', function($http, $location) {
  var vm = this;
  vm.users = {list: []};

  //function to clear careshare userlist div
  // vm.clearDiv = function() {
  //   console.log('clearDiv');
  //   vm.users.list = [];
  // }; //end clearDiv

  // Upon load, check this user's session on the server
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

  //function to get list of authenticated users from DB
  vm.getUsers = function() {
    console.log('connect button clicked!');
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

  //function to return to profile
  vm.returnToProfile = function() {
    console.log('back to profile button clicked!');
    $location.path('/profile');
  }; // end returnToProfile

  //function to share a profile with another user
  vm.shareProfile = function() {
    console.log('share button clicked!');
  }; // end shareProfile

}]);
