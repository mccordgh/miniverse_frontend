'use strict';

let app = angular.module('Bangazon', ['ngRoute']).constant('apiUrl', "http://localhost:8000");

app.config(($locationProvider, $routeProvider, $httpProvider) => {

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;

  $routeProvider
    .when('/dash', {
      templateUrl: 'app/partials/dash.html',
      controller: 'DashCtrl'
    })
    .when('/sellproduct', {
      templateUrl: 'app/partials/sellproduct.html',
      controller: 'sellProductCtrl'
    })
    .when('/cart', {
      templateUrl: 'app/partials/cart.html',
      controller: 'cartCtrl'
    })
    .when('/products', {
      templateUrl: 'app/partials/product_list.html',
      controller: 'productListCtrl'
    })
    .when('/product-detail', {
      templateUrl: 'app/partials/product_detail.html',
      controller: 'productDetailCtrl'
    })
    .when('/login', {
      templateUrl: 'app/partials/login.html',
      controller: 'loginCtrl'
    })

  .otherwise('/');

  $locationProvider.hashPrefix('');

  angular.module('Bangazon').factory('RootFactory', [
    "$http",
    "apiUrl",
    ($http, apiUrl) => {
      const httpGet = $http.get(apiUrl);

      return {
        getApiRoot() {
          return httpGet.then(res => res.data);
        }
      };
    }
  ]);
});
