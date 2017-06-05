myApp.controller('CareShareController', ['careShareService', function(careShareService) {
  console.log('made it to CareShareController');

  var self = this;

  self.users = careShareService.users;

  self.getUsers = careShareService.getUsers;
  
}]);
