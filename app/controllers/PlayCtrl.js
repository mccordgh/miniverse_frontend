'use strict';
app.controller('PlayCtrl', function($scope, $route, gameFactory, apiFactory) {

	$('#userInputBox').prop( "disabled", true );

	let room = 0;
	let validExits = [];

	$scope.isGameOver = gameFactory.getIsGameOver();
	$scope.userInput = "";


	apiFactory.getAdventure(1)
	.then((data) => {
		gameFactory.setCurrentAdventure(data);

		room = gameFactory.getCurrentRoom();
		validExits = gameFactory.getExits();


		$scope.gameObject = {
			title: gameFactory.getCurrentAdventureName(),
			roomText: gameFactory.getCurrentRoomText(),
			inventory: gameFactory.getInventory(),
			roomItem: gameFactory.getCurrentItem(),
			roomInteractive: gameFactory.getCurrentInteractive(),
			exits: validExits.join(", ")
		};

		$scope.$apply();
		$('#userInputBox').prop( "disabled", false );
		$('#userInputBox').focus();
	});

		$scope.handleUserInput = function(event) {
			if (event.charCode === 13) {
				let args = $scope.userInput.toLowerCase().split(" ");
				// Get first word from user input aka the command (MOVE, TAKE, USE)
				switch (args[0]) {
					case 'move':
						movePlayer(args[1]);
						break;
					case 'take':
						takeItem(args.join(" ").slice(5));
						break;
					case 'use':
						let itemAndInteractive = args.join(" ").slice(4).split(" on ");
						let item = itemAndInteractive[0];
						let interactive = itemAndInteractive[1];
						useItemOnInteractive(item, interactive);
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
				if (validExits[i].charAt(0).toLowerCase() === dir || validExits[i].toLowerCase() === direction)
					directionToMove = dir;
			}

			if (directionToMove){
				switch (dir){
					case 'n':
						gameFactory.setCurrentRoom(room - 2);
						break;
					case 'e':
						gameFactory.setCurrentRoom(room + 1);
						break;
					case 's':
						gameFactory.setCurrentRoom(room + 2);
						break;
					case 'w':
						gameFactory.setCurrentRoom(room - 1);
						break;
				}

				$route.reload();

			} else {
				alert("not a valid direction to move.");
			}
		}

		function takeItem(item){
			gameFactory.addToInventory(item);
			$scope.gameObject.inventory = gameFactory.getInventory();
			$scope.gameObject.roomItem = gameFactory.getCurrentItem();
			$('#userInputBox').prop('value', '');
		}

		function useItemOnInteractive(item, interactive){
			let itemObj = gameFactory.getItemFromInventoryByName(item);
			let interactiveObj = gameFactory.getInteractiveByName(interactive);

			if (itemObj === null || interactiveObj === null || interactiveObj.activator_id !== itemObj.id){
				alert("Invalid item or interactive");
				return;
			}

			gameFactory.useItemOnInteractive(itemObj, interactiveObj);
			$scope.gameObject.inventory = gameFactory.getInventory();
			$scope.gameObject.roomInteractive = gameFactory.getCurrentInteractive();
			$('#userInputBox').prop('value', '');
			$scope.isGameOver = gameFactory.getIsGameOver();
		}


		/////////////////////////////////////////////////////////////////
		///                     TESTING ZONE                          ///
		///////////////////////////////////////////////////////////////// 
		
		// gameFactory.setCurrentRoom(3);
		// validExits = gameFactory.getExits();
		// takeItem("DOG BONE");
		// gameFactory.setCurrentRoom(0);
		// validExits = gameFactory.getExits();
});
