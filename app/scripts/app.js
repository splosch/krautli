'use strict';

angular.module('krautli_yoApp', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/suggestName', {
        templateUrl: 'views/suggestName.html',
        controller: 'SuggestNameController'
      })
      .when('/details/:plantID/:plantName', {
        templateUrl: 'views/plantDetails.html',
        controller: 'PlantDetailsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
