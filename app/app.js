'use strict';

let app = angular.module('Bangazon', ['ngRoute']);

app.config( ($locationProvider, $routeProvider) => {

    $routeProvider
    .when('/', {
        templateUrl: 'app/partials/dash.html',
        controller: 'DashCtrl'
    })

    .otherwise('/');

    $locationProvider.hashPrefix('');

});