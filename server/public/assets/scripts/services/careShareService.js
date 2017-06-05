myApp.service('careShareService', ['$http', '$location', function($http, $location) {
  var vm = this;
  vm.users = [];

  //function to get list of authenticated users from DB
  vm.getUsers = function() {
    console.log('connect button clicked!');
    $http({
      method: 'GET',
      url: '/user/getUsers'
    }).then(function(res) {
      console.log(res.data);
      vm.users = [];
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i].username, vm.userName);
        if (res.data[i].username !== vm.userName) {
          vm.users.push(res.data[i]);
          console.log(vm.users);
        } //end if
      } //end for
    });
  }; //end getUsers
}]);
