'use strict';

angular.module('krautli_yoApp')
  .factory('plantListFactory', function () {
  	var factory = {},
  		initialPlantList = [
	      { id: 1, name: 'Ackergauchheil' },
	      { id: 2, name: 'Arnika' },
	      { id: 3, name: 'Beifuss' },
	      { id: 4, name: 'Eberesche' }
	    ];

	factory.getPlantList = function () {
		return initialPlantList;
	};    

	factory.addPlant = function ( plant ) {
		initialPlantList.push( plant );
		return initialPlantList;
	};  

  factory.newPlantId = function () {
    return initialPlantList.length + 1;
  };  

  	return factory;
  })
  .controller('SuggestNameController', function ($scope, plantListFactory) {

  	// still mocked - TODO:[LOW] replace with initial data
    $scope.plantNames = plantListFactory.getPlantList();

    $scope.addNewPlantName = function () {
    	var newPlant = {};

    	if ( !$scope.searchterm  || typeof $scope.searchterm !== "string" || $scope.searchterm.length < 4 ) {
    		return false;
    	}

    	newPlant.name = $scope.searchterm;
      newPlant.id   = plantListFactory.newPlantId();

    	plantListFactory.addPlant( newPlant );
    };

  });
