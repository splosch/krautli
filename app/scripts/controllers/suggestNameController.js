'use strict';

angular.module('krautli_yoApp')
  .controller('SuggestNameController', function ($scope, plantsFactory) {

  	// still mocked - TODO:[LOW] replace with initial data
    $scope.plantNames = plantsFactory.getPlantList();

    // init plantTypeFilter
    $scope.plantTypeFilter = '';

    $scope.addNewPlantName = function () {
    	var newPlant = {};

    	if ( !$scope.searchterm  || typeof $scope.searchterm !== "string" || $scope.searchterm.length < 4 ) {
    		return false;
    	}

    	newPlant.name = $scope.searchterm;
      newPlant.id   = plantsFactory.newPlantId();
      newPlant.own  = true;

    	plantsFactory.addPlant( newPlant );
    };

    // show all or just plants flagged as "own"
    // @param plantType filterObject e.g. { own : true } or '' or undefined
    // in case no filter is provided reset to ''
    $scope.togglePlanttype = function ( plantType ) {
      var plantType = plantType || '',
          clickedButton = event.target;

      // set the plantfilter based on the plantType
      $scope.plantTypeFilter = plantType;

      //toggle btn-success class on togglrPlantType Button
      $(clickedButton).toggleClass("btn-success", true)
                   .siblings().toggleClass("btn-success", false);
    };

  });
