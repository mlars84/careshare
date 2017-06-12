myApp.service('loginService', ['$http', '$location', function($http, $location) {
  const vm = this;

  vm.user = {
    username: '',
    email: '',
    password: ''
  };

  vm.login = function() {
    
    if(vm.user.username === '' || vm.user.password === '') {
      swal('Please enter your username and password or register to continue!');
    } else {
      
      $http.post('/', vm.user).then(function(response) {
        
        if(response.data.username) {
          
          // location works with SPA (ng-route)
          
          $location.path('/profile');
        } else {
          
          swal("Oops! You are not registered!");
        }
      });
    }
  }; //end login function

  vm.registerUser = function() {
    
    if(vm.user.username === '' || vm.user.password === '') {
      swal("Choose a username and password!");
    } else {
      
      $http.post('/register', vm.user).then(function(response) {
        
        $location.path('/home');
      },
      function(response) {
        
        swal("That username or password is already taken! Please try again.");
      });
    }
  }; //end registerUser function

}]); //end loginService
