'use strict';

angular.module('krautli_yoApp', [
  'ngRoute',
  'ngResource',
  'angularLocalStorage',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/suggestName'
        //templateUrl: 'views/main.html',
        //controller: 'MainCtrl'
      })
      .when('/suggestName', {
        templateUrl: 'views/suggestName.html',
        controller: 'SuggestNameController'
      })
      .when('/details/:plantID', {
        templateUrl: 'views/plantDetails.html',
        controller: 'PlantDetailsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
