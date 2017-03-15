"use strict";

app.factory('apiFactory', function apiFactoryFunc($http) {

	let apiFactoryObject = {

		getAdventure(pk) {
			return new Promise(function (resolve, reject){
				$http({
					url: `http://localhost:8000/get_adventure/${pk}`,
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						console.log(response.data.detail);
						reject(response.data.detail);
	  		});
	  	});			
	  },

		getAllAdventures(){
			return new Promise(function (resolve, reject){
				$http({
					url: `http://localhost:8000/get_all_adventures/`,
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						console.log(response.data.detail);
						reject(response.data.detail);
	  		});
	  	});			
		}

	};

	return apiFactoryObject;

});
