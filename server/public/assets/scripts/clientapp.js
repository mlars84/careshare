var myApp = angular.module('myApp', ['ngRoute', 'xeditable']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!
  $locationProvider.hashPrefix('');
  // $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/navigation.html',
      controller: 'LoginController as lc'
    })
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    })
    .otherwise({
      redirectTo: 'home'
    });

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

}]);
