'use strict';

angular.module('krautli_yoApp')
  .factory('plantListFactory', function () {
  	var factory = {},
  		initialPlantList = [
	      { name: 'Ackergauchheil' },
	      { name: 'Arnika' },
	      { name: 'Beifuss' },
	      { name: 'Eberesche' }
	    ];

	factory.getPlantList = function () {
		return initialPlantList;
	};    

	factory.addPlant = function ( plant ) {
		initialPlantList.push( plant );
		return initialPlantList;
	};  

  	return factory;
  })
  .controller('SuggestNameController', function ($scope, plantListFactory) {

  	// still mocked - TODO:[LOW] replace with initial data
    $scope.plantNames = plantListFactory.getPlantList();

    $scope.addNewPlantName = function () {
    	var newPlant = { name: $scope.searchterm };
    	
    	plantListFactory.addPlant( newPlant );
    }
  });
