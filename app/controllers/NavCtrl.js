'use strict';
app.controller('NavCtrl', function($scope) {
  $scope.navItems = [
    { name: "Home", url: '#/Home' },
    { name: "Products", url: '#/Products' },
    { name: "Sell Products", url: '#/SellProducts' }
  ];

  $scope.signOut = [
    { name: "Cart", url: '#/Cart' },
    { name: "Log Out", url: '#/login' }

  ];
});
