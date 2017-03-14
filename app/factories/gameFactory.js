"use strict";

app.factory('gameFactory', function gameFactoryFunc($http) {

	let currentAdventure = {};
	let currentRoom = 0;
	let inventory = [];

	let gameFactoryObject = {

		getCurrentAdventure() {
			return currentAdventure;
		},

		getCurrentAdventureName() {
			return currentAdventure.adventure[0].title;
		},

		getCurrentRoom() {
			return currentRoom;
		},

		getCurrentRoomText() {
			return currentAdventure.rooms[currentRoom].description;
		},

		getCurrentItem() {
			let itemID = currentAdventure.rooms[currentRoom].item_id;
			
			if (!itemID)
				return null;

			let items = currentAdventure.items;
			let itemObj = {};

			for (let i=0; i < items.length; i++){
				if (items[i].id === itemID)
					itemObj = items[i];
			}

			return itemObj;
		},

		getCurrentInteractive() {
			let interactiveID = currentAdventure.rooms[currentRoom].interactive_id;
			
			if (!interactiveID)
				return null;

			let interactives = currentAdventure.interactives;
			let interactiveObj = {};

			for (let i=0; i < interactives.length; i++){
				if (interactives[i].id === interactiveID)
					interactiveObj = interactives[i];
			}

			return interactiveObj;
		},

		getExits() {
			switch (currentRoom) {
			// Returns True or False for Exits in order [North, East, South, West]
				case 0:
					return ['EAST', 'SOUTH'];
				case 1:
					return ['SOUTH', 'WEST'];
				case 2:
					return ['NORTH', 'EAST'];
				case 3:
					return ['NORTH', 'WEST'];
			}
		},

		getInventory() {
			if (inventory.length === 0)
				return null;
			return inventory;
		},

		addToInventory(item) {
			inventory.push(item);
		},

		setCurrentAdventure(newAdventure) {
			currentAdventure = newAdventure;
		},

		setCurrentRoom(newRoom) {
			currentRoom = newRoom;
		},

	};

	return gameFactoryObject;

});
