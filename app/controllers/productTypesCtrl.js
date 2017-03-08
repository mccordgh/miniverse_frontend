"use strict";

app.controller("productTypesCtrl", function($scope, apiFactory){
	
	$scope.categories = {0: "Retrieving Product Types"};
	$scope.isLogged = 'waiting';

	apiFactory.getProductTypes()
		.then(function(data){
			$scope.isLogged = 'true';
			$scope.categories = data;
			$scope.$apply();
		})
		.catch(function(data){
			$scope.isLogged = 'false';
			$scope.$apply();
			console.log("error", data);
		});

});