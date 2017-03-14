'use strict';

let app = angular.module('Miniverse', ['ngRoute']).constant('apiUrl', "http://localhost:8000");

app.config(($locationProvider, $routeProvider, $httpProvider) => {

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = false;

  $routeProvider
    .when('/home', {
      templateUrl: 'app/partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/adventure/:pk', {
      templateUrl: 'app/partials/adventure.html',
      controller: 'AdventureCtrl'
    })
    .when('/play', {
      templateUrl: 'app/partials/play.html',
      controller: 'PlayCtrl'
    })
    .otherwise('/');

  $locationProvider.hashPrefix('');

  angular.module('Miniverse').factory('RootFactory', [
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
