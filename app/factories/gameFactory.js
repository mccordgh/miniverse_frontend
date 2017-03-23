"use strict";

// gameFactory will handle the most important logic and persistant data necessary for a complete text adventure experience
app.factory('gameFactory', function gameFactoryFunc($http, $location) {

	let currentAdventure = {};
	let currentRoom = 0;
	let inventory = [];
	let isGameOver = false;
	let isLoaded = false;
	let chosenAdventure = 0;

	let gameFactoryObject = {
		// adds item to user inventory
		addToInventory(item) {
			item = this.getItemByName(item);
			let itemID = item.id;
			let newItem = {};
			for (let i=0; i < currentAdventure.items.length; i++){
				if (currentAdventure.items[i].id === itemID) {
					newItem = currentAdventure.items[i];
					currentAdventure.items.splice(i, 1);
				}
			}
			inventory.push(newItem);
		},
		// returns adventure chosen from home list
		getChosenAdventure(){
			return chosenAdventure;
		},
		// returns adventure the user is currently exploring
		getCurrentAdventure() {
			return currentAdventure;
		},
		// returns the title of the current adventure
		getCurrentAdventureName() {
			return currentAdventure.adventure[0].title;
		},
		// returns the current item in a room, if any
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
		// returns the current interactive in a room, if any
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
		// returns the current room the user is in
		getCurrentRoom() {
			return currentRoom;
		},
		// returns the current room description text
		getCurrentRoomText() {
			return currentAdventure.rooms[currentRoom].description;
		},
		// returns available exits for the current room
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
		// returns an interactive by name search
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
		// returns play inventory
		getInventory() {
			if (inventory.length === 0)
				return null;
			return inventory;
		},
		// returns game over flag
		getIsGameOver(){
			return isGameOver;
		},
		// returns an item by name search
		getItemByName(name){
			name = name.toLowerCase();
			let item = {};
				for(let i=0; i < currentAdventure.items.length; i++){
					if (currentAdventure.items[i].name.toLowerCase() === name)
						return currentAdventure.items[i];
				}
			
			return null;
		},
		// returns isLoaded flag 
		getIsLoaded() {
			return isLoaded;
		},
		// returns an item from the user inventory by name search
		getItemFromInventoryByName(name){
			name = name.toLowerCase();
			let item = {};
				for(let i=0; i < inventory.length; i++){
					if (inventory[i].name.toLowerCase() === name)
						return inventory[i];
				}
			
			return null;
		},
		// set the chosen adventure
		setChosenAdventure(newAdventure){
			chosenAdventure = newAdventure;
		},
		// set the current exploring adventure
		setCurrentAdventure(newAdventure) {
			currentAdventure = newAdventure;
		},
		// set the current room the user is in
		setCurrentRoom(newRoom) {
			currentRoom = newRoom;
		},
		// set the isGameOver flag
		setIsGameOver(flag){
			isGameOver = flag;
		},
		// set the isLoaded flag
		setIsLoaded(flag){
			isLoaded = flag;
		},
		// functionality for using an item on an interactive
		useItemOnInteractive(item, interactive){

			let newItem = {};

			if (item.id !== interactive.activator_id)
				return null;
			
			if (interactive.action === "end"){
				this.setIsGameOver(true);
				inventory = [];
				return "WIN, DUDE (or dudette)!";
			}

			let itemName = "";
			for (let i=0; i < currentAdventure.items.length; i++){
				if (currentAdventure.items[i].id === interactive.reward_id)
					newItem = currentAdventure.items[i];
					itemName = newItem.name;
			}
			
			inventory.splice(0, 1);
			currentAdventure.interactives.splice(interactive.id - 1, 1);

			this.addToInventory(newItem.name);
			return itemName;

		}
	};

	return gameFactoryObject;

});
