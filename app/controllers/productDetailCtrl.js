"use strict";

app.controller('productDetailCtrl', function($scope, $routeParams, apiFactory) {
	$scope.pk = $routeParams.pk;
	$scope.isLogged = 'waiting';

	apiFactory.getProductDetail($scope.pk)
		.then(function(data){
			$scope.isLogged = 'true';
			$scope.product = data;
			$scope.$apply();
		})
		.catch(function(data){
			$scope.isLogged = 'false';
			console.log("error", data);
			$scope.$apply();
		});

});
