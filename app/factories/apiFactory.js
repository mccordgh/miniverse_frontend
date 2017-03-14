"use strict";

app.factory('apiFactory', function apiFactoryFunc($http) {

	let apiFactoryObject = {

		getAdventure(pk) {
			let adventureObject = {
			  "adventure": [
			    {
			      "id": 1,
			      "user_id": 1,
			      "title": "Beach Party",
			      "rating": 0,
			      "published": false
			    }
			  ],
			  "interactives": [
			    {
			      "id": 1,
			      "name": "snarling dog",
			      "description": "This dog seems to be chewing on a colorful beach ball. Perhaps you could distract it...",
			      "action": "give",
			      "activator_id": 1,
			      "reward_id": 2
			    },
			    {
			      "id": 2,
			      "name": "crying child",
			      "description": "The crying child says, \"I've lost my favorite beach ball. WAHHHHHH\"",
			      "action": "end",
			      "activator_id": 2,
			      "reward_id": null
			    }
			  ],
			  "items": [
			    {
			      "id": 1,
			      "name": "dog bone",
			      "description": "A bone that could please or distract a dog."
			    },
			    {
			      "id": 2,
			      "name": "beach ball",
			      "description": "a colorful beach ball."
			    }
			  ],
 "rooms": [
    {
      "id": 1,
      "room_number": 1,
      "description": "You are at the north west of the beach",
      "adventure_id": 1,
      "item_id": null,
      "interactive_id": 1
    },
    {
      "id": 2,
      "room_number": 2,
      "description": "You are at the north east of the beach",
      "adventure_id": 1,
      "item_id": null,
      "interactive_id": 2
    },
    {
      "id": 3,
      "room_number": 3,
      "description": "You are at the south west of the beach",
      "adventure_id": 1,
      "item_id": null,
      "interactive_id": null
    },
    {
      "id": 4,
      "room_number": 4,
      "description": "You are at the south east of the beach",
      "adventure_id": 1,
      "item_id": 1,
      "interactive_id": null
    }
  ]
  			};

			return adventureObject;
		},

		login() {

		},

		logout() {

		}
	};

	return apiFactoryObject;

});
