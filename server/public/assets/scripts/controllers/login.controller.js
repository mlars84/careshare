myApp.controller('LoginController', ['loginService', function(loginService) {
  console.log('LoginController loaded');

  const self = this;

  self.user = loginService.user;

  self.message = loginService.message;

  self.login = loginService.login;

  self.registerUser = loginService.registerUser;


}]); //end LoginController
