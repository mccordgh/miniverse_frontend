'use strict';
app.controller('AdventureCtrl', function($scope, $routeParams, apiFactory, gameFactory) {

	// API Call to get the data for a single adventure
	apiFactory.getAdventure($routeParams.pk)
	.then((data) => {
		gameFactory.setCurrentAdventure(data);
		gameFactory.setChosenAdventure($routeParams.pk);

		$scope.title = gameFactory.getCurrentAdventureName();
		gameFactory.setIsGameOver(false);
		$scope.$apply();
	});

});
