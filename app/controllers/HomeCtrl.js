'use strict';
app.controller('HomeCtrl', function($scope, apiFactory) {

	// API call to get the names and IDs of all available adventures
	apiFactory.getAllAdventures()
		.then((data) => {
			$scope.adventures = data.adventures;
			$scope.$apply();
		});

});
