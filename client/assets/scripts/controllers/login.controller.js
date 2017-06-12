myApp.controller('LoginController', ['loginService', function(loginService) {
  

  const self = this;

  self.user = loginService.user;

  self.login = loginService.login;

  self.registerUser = loginService.registerUser;


}]); //end LoginController
