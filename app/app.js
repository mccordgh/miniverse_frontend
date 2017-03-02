'use strict';

let app = angular.module('Bangazon', ['ngRoute']);

app.config( ($locationProvider, $routeProvider) => {

    $routeProvider
    .when('/', {
        templateUrl: 'app/partials/home.html',
        controller: 'MainCtrl'
    })

    .otherwise('/');

    $locationProvider.hashPrefix('');

});