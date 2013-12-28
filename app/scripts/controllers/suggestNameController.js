'use strict';

angular.module('krautli_yoApp')
  .factory('plantListFactory', function () {
  	var factory = {},
  		initialPlantList = [
	      { id: 1, name: 'Ackergauchheil' },
	      { id: 3, name: 'Beifuss' },
        { id: 2, name: 'Arnika', own: true },
	      { id: 4, name: 'Eberesche', 
          own: true,
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

    // init plantTypeFilter
    $scope.plantTypeFilter = '';

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
