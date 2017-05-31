myApp.controller('UserController', ['$http', '$location', function($http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('checking user');

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
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  vm.addProfile = function() {
    console.log('clicked submit');
    var profileToSend = {
      imageUrl: vm.imageUrl,
      name: vm.nameIn,
      basicInfo: vm.basicInfoIn,
      careInfo: vm.careInfoIn,
      user: vm.userId
    };
    console.log(profileToSend);
    $http({
      method: 'POST',
      url: '/user/addProfile',
      data: profileToSend
    }).then(function(res) {
      console.log(res);
    });
    vm.getAllProfiles();
  }; //end addProfile

  vm.getAllProfiles = function() {
    console.log('display buttong clicked!');
    $http({
      method: 'GET',
      url: '/user/getAllProfiles'
    }).then(function(res) {
      console.log(res.data);
    });
  }; //end getAllProfiles
}]); //end UserController
