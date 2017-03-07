"use strict";

app.controller('productDetailCtrl', function($scope, $routeParams, apiFactory) {
	$scope.pk = $routeParams.pk;

	apiFactory.getProductDetail($scope.pk)
		.then(function(data){
			$scope.product = data;
			$scope.$apply();
		})
		.catch(function(data){
			console.log("error", data);
		});

});
