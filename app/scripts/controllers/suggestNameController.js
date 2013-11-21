'use strict';

angular.module('krautli_yoApp')
  .factory('plantListFactory', function () {
  	var factory = {},
  		initialPlantList = [
	      { id: 1, name: 'Ackergauchheil' },
	      { id: 3, name: 'Beifuss' },
        { id: 2, name: 'Arnika', own: true },
	      { id: 4, name: 'Eberesche', 
          locations: [ 
            { lat: '-20.223', long: '45.099' },
            { lat: '-13.200', long: '15.013' }
          ]},
        { id: 8, name: 'Dreibla' }
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
      newPlant.own  = true;

    	plantListFactory.addPlant( newPlant );
    };

  });
