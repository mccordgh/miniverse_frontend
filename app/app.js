'use strict';

let app = angular.module('Bangazon', ['ngRoute']);

app.config(($locationProvider, $routeProvider) => {

  $routeProvider
    .when('/dash', {
      templateUrl: 'app/partials/dash.html',
      controller: 'DashCtrl'
    })
    .when('/sellproduct', {
      templateUrl: 'app/partials/sellproduct.html',
      controller: 'sellProductCtrl'
    })

  .otherwise('/');

  $locationProvider.hashPrefix('');

});
