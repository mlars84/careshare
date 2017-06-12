myApp.service('loginService', ['$http', '$location', function($http, $location) {
  const vm = this;

  vm.user = {
    username: '',
    email: '',
    password: ''
  };

  vm.login = function() {
    console.log('here', vm.user);
    if(vm.user.username === '' || vm.user.password === '') {
      swal('Please enter your username and password or register to continue!');
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
          swal("Oops! You are not registered!");
        }
      });
    }
  }; //end login function

  vm.registerUser = function() {
    console.log('registerUser function');
    if(vm.user.username === '' || vm.user.password === '') {
      swal("Choose a username and password!");
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('success', response.data);
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        swal("That username or password is already taken! Please try again.");
      });
    }
  }; //end registerUser function

}]); //end loginService
