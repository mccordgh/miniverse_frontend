'use strict';
app.controller('NavCtrl', function($scope) {
  $scope.navItems = [
    { name: "Home", url: '#/home' },
    { name: "Products", url: '#/products' },
    { name: "Sell Products", url: '#/sellproduct' }
  ];

  $scope.signOut = [
    { name: "Cart", url: '#/Cart' },
    { name: "Log Out", url: '#/login' }

  ];
});
