'use strict';
app.controller('HomeCtrl', function($scope, apiFactory) {

	apiFactory.getAllAdventures()
		.then((data) => {
			$scope.adventures = data.adventures;
			$scope.$apply();
		});

});
