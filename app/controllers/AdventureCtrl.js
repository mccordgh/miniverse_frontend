'use strict';
app.controller('AdventureCtrl', function($scope, $routeParams, apiFactory, gameFactory) {

	gameFactory.setCurrentAdventure(apiFactory.getAdventure($routeParams.pk));

	let adventure = gameFactory.getCurrentAdventure();

	$scope.adventureTitle = adventure.adventure[0].title;
	$scope.adventureRating = adventure.adventure[0].rating;
	$scope.adventureAuthor = adventure.adventure[0].user_id;

});
