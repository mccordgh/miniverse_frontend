"use strict";

app.controller("productListCtrl", function($scope, $routeParams, apiFactory){
	$scope.category = $routeParams.category;
	$scope.pk = $routeParams.pk;
	$scope.isLogged = 'waiting';
	$scope.products = [];


	apiFactory.getProducts()
		.then(function(data){
			$scope.isLogged = 'true';
			for (let i=0; i < data.length; i++){
				if (data[i].product_type == `http://localhost:8000/product_types/${$scope.pk}/`){
					$scope.products.push(data[i]);
				}
			}
			$scope.$apply();
		})
		.catch(function(data){
			$scope.isLogged = 'false';
			console.log("error", data);
			$scope.$apply();
		});


});