'use strict';

angular.module('krautli_yoApp')
  .factory('plantDetailsFactory', function () {
      var factory = {};

      return factory;
  })
  .controller('PlantDetailsController', function ($scope, $route, $routeParams, plantDetailsFactory) {
  	var plantId = $routeParams.plantID || "#",
  		plantName = $routeParams.plantName || "unknown";
  	$scope.plant = { name : plantName, id : plantId }
  });
