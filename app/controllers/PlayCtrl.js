'use strict';
app.controller('PlayCtrl', function($scope, $route, gameFactory, apiFactory) {

	// Setup helper variables for later use
	let room = 0;
	let validExits = [];
	let isLoaded = gameFactory.getIsLoaded();
	let consoleFlashCounter = 0;
	let consoleFlashInterval = "";

	//Get console Element
	let adventureConsole = $('#adventureConsole');
	adventureConsole.css('color', 'orange');

	// Reset user input text box
	$scope.userInput = "";

	// Check if adventure has been ended
	$scope.isGameOver = gameFactory.getIsGameOver();

	//Get all the info for the Adventure and current room of the Adventure
	room = gameFactory.getCurrentRoom();
	alertPlayer(`You moved in to room #${room + 1}`);
	validExits = gameFactory.getExits();
	$scope.gameObject = {
		title: gameFactory.getCurrentAdventureName(),
		roomText: gameFactory.getCurrentRoomText(),
		inventory: gameFactory.getInventory(),
		roomItem: gameFactory.getCurrentItem(),
		roomInteractive: gameFactory.getCurrentInteractive(),
		exits: validExits.join(", ")
	};

	$('#userInputBox').focus();

	//Handles the input of commands by the user
	$scope.handleUserInput = function(event) {
		if (event.charCode === 13) {
			// Get first word from user input aka the command (MOVE, TAKE, USE)
			let args = $scope.userInput.toLowerCase().split(" ");
			$('#userInputBox').prop('value', '');

			// If the length is one, they are most likely trying to move by typing 'e, n, s, w'
			if (args.length === 1){
				
				// If they input 'n, e, s, w', then move in that direction
				if (args[0] === 'n' || args[0] === 'e' || args[0] === 's' || args[0] === 'w')
					movePlayer(args[0]);
				else
					// If not, give an error
					alertPlayer("DID NOT UNDERSTAND THAT COMMAND. PLEASE READ COMMANDS LIST BELOW.");
			
			} else {
				// compare the first argument from the user commands and call appropriate function
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
						alertPlayer("DID NOT UNDERSTAND THAT COMMAND. PLEASE READ COMMANDS LIST BELOW.");
				}
			}
		}
	};

	// This function is responsible for moving the player from room to room
	function movePlayer(direction){
		let dir = direction.charAt(0);
		let directionToMove = "";

		for (let i=0; i < validExits.length; i++){
			if (validExits[i].charAt(0).toLowerCase() === dir || validExits[i].toLowerCase() === direction)
				directionToMove = dir;
		}

		// move to room specified by direction given
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
			alertPlayer(`THAT IS NOT A VALID DIRECTION TO MOVE. TRY ${validExits.join(", ").toLowerCase()}`);
		}
	}

	// Takes an item from the room, and putting it in to the players inventory
	function takeItem(item){
		if (gameFactory.getInteractiveByName(item)){
			alertPlayer(`${item.toUpperCase()} IS AN INTERACTIVE. TRY USING ANOTHER ITEM ON IT.`);
			return;
		}
		if (gameFactory.getItemByName(item)){
			gameFactory.addToInventory(item);
			$scope.gameObject.inventory = gameFactory.getInventory();
			$scope.gameObject.roomItem = gameFactory.getCurrentItem();
			$('#userInputBox').prop('value', '');
			alertPlayer("YOU RECEIVED THE " + item.toUpperCase());
		} else {
			alertPlayer(`A ${item.toUpperCase()} IS NOT HERE.`);
		}
	}

	// Function for using an item on an interactive
	function useItemOnInteractive(item, interactive){
		let itemObj = gameFactory.getItemFromInventoryByName(item);
		let interactiveObj = gameFactory.getInteractiveByName(interactive);

		if (itemObj === null || interactiveObj === null || interactiveObj.activator_id !== itemObj.id){
			alertPlayer("INVALID ITEM OR INTERACTIVE.");
			return;
		}

		let itemName = gameFactory.useItemOnInteractive(itemObj, interactiveObj);
		alertPlayer("YOU RECEIVED THE " + itemName);

		$scope.gameObject.inventory = gameFactory.getInventory();
		$scope.gameObject.roomInteractive = gameFactory.getCurrentInteractive();
		$('#userInputBox').prop('value', '');
		$scope.isGameOver = gameFactory.getIsGameOver();
	}

	// Function for alerting player of their last action or error in the top right console
	function alertPlayer(msg){
		$scope.lastAction = msg;
		consoleFlashInterval = setInterval(consoleFlash, 30);
	}

	// Flash the console to white then fade it back down to orange
	function consoleFlash() {
		consoleFlashCounter++;

		if (consoleFlashCounter % 2 === 0){
			adventureConsole.css(
				`color`, 
				`orange`
				);
		} else {
			adventureConsole.css(
				`color`, 
				`white`
				);
		}

		if (consoleFlashCounter === 10) {
			consoleFlashCounter = 0;
			clearInterval(consoleFlashInterval);
		}
	}

});
