'use strict';
app.controller('HomeCtrl', function($scope, apiFactory) {

	apiFactory.getAllAdventures()
		.then((data) => {
			console.log("all", data);
			$scope.adventures = data;
		});

});
