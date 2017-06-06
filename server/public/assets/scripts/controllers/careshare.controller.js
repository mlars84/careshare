myApp.controller('CareShareController', ['careShareService', function(careShareService) {
  console.log('made it to CareShareController');

  var self = this;

  self.userName = careShareService.userName;
  self.userId = careShareService.userId;

  self.users = careShareService.users;

  self.getUsers = careShareService.getUsers;

  self.returnToProfile = careShareService.returnToProfile;

  self.clearUsers = careShareService.clearUsers;

  self.shareProfile = careShareService.shareProfile;

  self.getProfilesToShare = careShareService.getProfilesToShare;
  self.profiles = careShareService.profiles;

}]);
