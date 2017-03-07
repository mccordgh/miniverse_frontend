"use strict";

app.controller("productTypesCtrl", function($scope, apiFactory){
	
	$scope.categories = {0: "Retrieving Product Types"};

	apiFactory.getProductTypes()
		.then(function(data){
			$scope.categories = data;
			$scope.$apply();
		})
		.catch(function(data){
			console.log("error", data);
		});

});