'use strict';
app.controller('sellProductCtrl', function($scope, $http, $location) {
  $scope.title = "Create a Product";

  $scope.products = {
    name: "this is the name test2",
    description: "here is the description",
    price: "1.50",
    quantity: 3
  };

  $scope.sellproduct = function() {
    $http({
      url: "http://localhost:8000/products/",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "name": $scope.products.name,
        "description": $scope.products.description,
        "price": $scope.products.price,
        "quantity": $scope.products.quantity
      }
    }).then(res => {
      if (res.data.success === true) {
        $location.path('/cart');
      } else {
        // Show dialog element telling user that registration failed
      }
    });
  };
});
