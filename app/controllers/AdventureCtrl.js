'use strict';
app.controller('AdventureCtrl', function($scope, $routeParams, apiFactory, gameFactory) {

	apiFactory.getAdventure($routeParams.pk)
	.then((data) => {
		gameFactory.setCurrentAdventure(data);
		gameFactory.setChosenAdventure($routeParams.pk);

		$scope.title = gameFactory.getCurrentAdventureName();

		$scope.$apply();
	});

});
