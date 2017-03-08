'use strict';
app.controller('NavCtrl', function($scope, $http, $location) {
  $scope.navItems = [
    { name: "Home", url: '#/home' },
    { name: "Products", url: '#/product_types' },
    { name: "Sell Products", url: '#/sellproduct' }
  ];

  $scope.signOut = [
    { name: "Log Out", url: '#/login' },
    { name: "Cart", url: '#/cart' }
  ];
});
