'use strict';
app.controller('PlayCtrl', function($scope, $route, gameFactory, apiFactory) {

	gameFactory.setCurrentAdventure(apiFactory.getAdventure(1));
	$scope.userInput = "take dog bone";

	let validExits = gameFactory.getExits();
	let room = gameFactory.getCurrentRoom();

	$scope.gameObject = {
		title: gameFactory.getCurrentAdventureName(),
		roomText: gameFactory.getCurrentRoomText(),
		inventory: gameFactory.getInventory(),
		roomItem: gameFactory.getCurrentItem(),
		roomInteractive: gameFactory.getCurrentInteractive(),
		exits: validExits.join(", ")
	};

	$scope.handleUserInput = function(event) {
		console.log(event);
		if (event.charCode === 13) {
			let args = $scope.userInput.toUpperCase().split(" ");
			// Get first word from user input aka the command (MOVE, TAKE, USE)
			switch (args[0].toLowerCase()) {
				case 'move':
					movePlayer(args[1]);
					break;
				case 'take':
					takeItem(args.join(" ").slice(5));
					break;
				case 'use':
					useItem();
					break;
				default:
					alert("did not understand command");
			}
		}
	};

	function movePlayer(direction){
		let dir = direction.charAt(0);
		let directionToMove = "";

		for (let i=0; i < validExits.length; i++){
			console.log(validExits[i], dir, direction);
			if (validExits[i].charAt(0) === dir || validExits[i] === direction)
				directionToMove = dir;
		}

		console.log("setting room");

		if (directionToMove){
			switch (dir){
				case 'N':
					gameFactory.setCurrentRoom(room - 2);
					break;
				case 'E':
					gameFactory.setCurrentRoom(room + 1);
					break;
				case 'S':
					gameFactory.setCurrentRoom(room + 2);
					break;
				case 'W':
					gameFactory.setCurrentRoom(room - 1);
					break;
			}

			$route.reload();

		} else {
			console.log("not a valid direction to move");
		}
	}

	function takeItem(item){
		gameFactory.addToInventory(item);
		$scope.gameObject.inventory = gameFactory.getInventory();
		$scope.gameObject.roomItem = gameFactory.getCurrentItem();
	}

	function useItem(){
		console.log("use item function");
	}

});
