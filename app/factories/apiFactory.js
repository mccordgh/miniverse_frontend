"use strict";

app.factory('apiFactory', function apiFactoryFunc($http) {

	let apiFactoryObject = {

		getOrders: function(customer){
			let orders = [];

			return orders;
		},

		getPaymentTypes: function(customer){
			let paymentTypes = [];

			return paymentTypes;
		},

		getProductDetail: function(pk){
			return new Promise(function (resolve, reject){
				$http({
					url: `http://localhost:8000/products/${pk}`,
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						reject(response.data.detail);
	  		});
	  	});
		},

		getProducts: function(){
			return new Promise(function (resolve, reject){
				$http({
					url: 'http://localhost:8000/products/',
					method: 'GET'
				}).then(function success(response) {
						resolve(response.data);
	  			}, function error(response) {
						reject(response.data.detail);
	  		});
	  	});
		},

		getProductTypes: function(){
			return new Promise(function (resolve, reject){
				$http({
					url: 'http://localhost:8000/product_types/',
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
