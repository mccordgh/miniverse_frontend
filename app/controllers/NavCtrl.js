'use strict';
app.controller('NavCtrl', function($scope, $http, $location) {
  $scope.navItems = [
    { name: "Home", url: '#/home' },
  ];

  $scope.signOut = [
    { name: "Log Out", url: '#/login' },
  ];
});
