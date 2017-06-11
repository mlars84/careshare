myApp.controller('CareShareController', ['careShareService', '$scope', '$window', function(careShareService, $scope, $window) {
  console.log('made it to CareShareController');

  const self = this;

  self.userName = careShareService.userName;
  self.userId = careShareService.userId;

  self.users = careShareService.users;

  self.getUsers = careShareService.getUsers;

  self.returnToProfile = careShareService.returnToProfile;

  self.clearUsers = careShareService.clearUsers;

  self.shareProfile = careShareService.shareProfile;

  self.getProfilesToShare = careShareService.getProfilesToShare;
  self.profiles = careShareService.profiles;

  self.getCareShares = careShareService.getCareShares;
  self.careShares = careShareService.careShares;

  self.unShareProfile = careShareService.unShareProfile;

  $scope.$on('$viewContentLoaded', function () {
    $window.scrollTo(0, 0);


}]);
