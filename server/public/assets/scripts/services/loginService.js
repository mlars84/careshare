myApp.service('loginService', ['$http', '$location', function($http, $location) {
  var vm = this;

  vm.user = {
    username: '',
    password: ''
  };

  vm.message = '';

  vm.login = function() {
    console.log('here', vm.user);
    if(vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/', vm.user).then(function(response) {
        console.log('login from server:', response);
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to profile page');
          $location.path('/profile');
        } else {
          console.log('failure: ', response);
          vm.message = "You are not registered!";
        }
      });
    }
  }; //end login function

  vm.registerUser = function() {
    console.log('registerUser function');
    if(vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
      console.log(vm.message);
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('success', response.data);
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        vm.message = "Please try again.";
      });
    }
  }; //end registerUser function

}]); //end loginService
