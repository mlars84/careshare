const myApp = angular.module('myApp', ['ngRoute', 'xeditable']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$location', '$anchorScroll', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!
  // $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);

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
    .when('/profile', {
      templateUrl: '/views/profile.html',
      controller: "profileController as pc"
    })
    .when('/careshare', {
      templateUrl: '/views/careshare.html',
      controller: 'CareShareController as csc'
    })
    .otherwise({
      redirectTo: '/home'
    });

    $location.hash('top');
    $anchorScroll();

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


// myApp.run(function($rootScope, $anchorScroll){
//    $rootScope.$on("$locationChangeSuccess", function(){
//        $anchorScroll();
//    });
// });

}]);
