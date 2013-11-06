'use strict';

angular.module('krautli_yoApp', [
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
      .otherwise({
        redirectTo: '/'
      });
  });
