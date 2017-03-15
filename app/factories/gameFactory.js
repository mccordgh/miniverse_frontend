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

		getInteractiveByName(name){
			let interactiveID = currentAdventure.rooms[currentRoom].interactive_id;
			let interactive = {};

				for(let i=0; i < currentAdventure.interactives.length; i++){
					if (currentAdventure.interactives[i].name.toLowerCase() === name)
						interactive = currentAdventure.interactives[i];
				}

				if (interactive.id === interactiveID){
					return interactive;
				} else {
					return null;
				}

		},

		getInventory() {
			if (inventory.length === 0)
				return null;
			return inventory;
		},
		//Get Item From Inventory by Name
		getItemByName(name){
			let item = {};
				for(let i=0; i < inventory.length; i++){
					if (inventory[i].name.toLowerCase() === name)
						return inventory[i];
				}
			
			return null;
		},

		addToInventory(item) {
			let itemID = currentAdventure.rooms[currentRoom].item_id;
			let newItem = {};
			for (let i=0; i < currentAdventure.items.length; i++){
				if (currentAdventure.items[i].id === itemID) {
					newItem = currentAdventure.items[i];
					currentAdventure.items.splice(i, 1);
				}
			}
			inventory.push(newItem);
		},

		setCurrentAdventure(newAdventure) {
			currentAdventure = newAdventure;
		},

		setCurrentRoom(newRoom) {
			currentRoom = newRoom;
		},

		useItemOnInteractive(item, interactive){
			console.log("item", item);
			console.log("interactive", interactive);

			if (item.id !== interactive.activator_id)
				return null;
		
			
		}

	};

	return gameFactoryObject;

});
