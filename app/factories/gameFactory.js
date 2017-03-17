"use strict";

app.factory('gameFactory', function gameFactoryFunc($http, $location) {

	let currentAdventure = {};
	let currentRoom = 0;
	let inventory = [];
	let isGameOver = false;
	let isLoaded = false;
	let chosenAdventure = 0;

	let gameFactoryObject = {

		getChosenAdventure(){
			return chosenAdventure;
		},

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

		getIsGameOver(){
			return isGameOver;
		},

		getItemByName(name){
			name = name.toLowerCase();
			let item = {};
				for(let i=0; i < currentAdventure.items.length; i++){
					if (currentAdventure.items[i].name.toLowerCase() === name)
						return currentAdventure.items[i];
				}
			
			return null;
		},

		//Get Item From Inventory by Name
		getItemFromInventoryByName(name){
			name = name.toLowerCase();
			let item = {};
				for(let i=0; i < inventory.length; i++){
					if (inventory[i].name.toLowerCase() === name)
						return inventory[i];
				}
			
			return null;
		},

		getIsLoaded() {
			return isLoaded;
		},

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

		setChosenAdventure(newAdventure){
			chosenAdventure = newAdventure;
		},

		setCurrentAdventure(newAdventure) {
			currentAdventure = newAdventure;
		},

		setCurrentRoom(newRoom) {
			currentRoom = newRoom;
		},

		setIsGameOver(flag){
			isGameOver = flag;
		},

		setIsLoaded(flag){
			isLoaded = flag;
		},

		useItemOnInteractive(item, interactive){

			let newItem = {};

			if (item.id !== interactive.activator_id)
				return null;
			
			if (interactive.action === "end"){
				this.setIsGameOver(true);
				return;
			}

			for (let i=0; i < currentAdventure.items.length; i++){
				if (currentAdventure.items[i].id === interactive.reward_id)
					alert("YOU RECEIVED THE " + currentAdventure.items[i].name);
					newItem = currentAdventure.items[i];
			}
			

			inventory.splice(0, 1);
			currentAdventure.interactives.splice(interactive.id - 1, 1);

			this.addToInventory(newItem.name);


		}

	};

	return gameFactoryObject;

});
