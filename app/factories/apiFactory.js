"use strict";

// apiFactory will handle the necessary API calls needed for app
app.factory('apiFactory', function apiFactoryFunc($http) {

	let apiFactoryObject = {

		// Returns all the data for a single text adventure
		getAdventure(pk) {
			return new Promise(function (resolve, reject){
				$http({
					url: `http://localhost:8000/get_adventure/${pk}`,
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						reject(response.data.detail);
	  		});
	  	});			
	  },

	  // Returns a list of all text adventures, and associated IDs
		getAllAdventures(){
			return new Promise(function (resolve, reject){
				$http({
					url: `http://localhost:8000/get_all_adventures/`,
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						reject(response.data.detail);
	  		});
	  	});			
		}

	};

	return apiFactoryObject;

});
