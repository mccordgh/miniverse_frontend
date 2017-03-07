'use strict';

let app = angular.module('Bangazon', ['ngRoute']);

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
    .when('/product_types',{
      templateUrl: 'app/partials/product_types.html',
      controller: 'productTypesCtrl'
    })
    .when('/product_list/:category/:pk',{
      templateUrl: 'app/partials/product_list.html',
      controller: 'productListCtrl'
    })
    .when('/product_detail/:pk', {
      templateUrl: 'app/partials/product_detail.html',
      controller: 'productDetailCtrl'
    })

  .otherwise('/');


  $locationProvider.hashPrefix('');

});
