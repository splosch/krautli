'use strict';

angular.module('krautli_yoApp')
  .factory('plantDetailsFactory', function () {
      var factory = {},
          // plants shall be fetched via network and persisted as objects locally
          plants = { 
            1 : { name: 'Ackergauchheil' },
            2 : { name: 'Arnika', 
                  own: true },
            3 : { name: 'Beifuss' },
            4 : { name: 'Eberesche', 
                own: true,
                locations: [ 
                { lat: '-20.223', long: '45.099' },
                { lat: '-13.200', long: '15.013' }
              ]},
            8 : { name: 'Dreibla' }
          };  

      factory.getPlantDetails = function (id) {
        var plant = plants[id] || null;

        plant.id = plant ? id : null ;

        return plant;
      };

      factory.addPlantPositon = function ( id, pos ) {
        var locations = [];

        if (id && plants[id] && pos && pos.lat && pos.long) {
          locations = plants[id].locations || [];
          locations.push( pos );
          plants[id].locations = locations;
        }

        return locations;
      };  

      return factory;
  })
  .controller('PlantDetailsController', function ($scope, $route, $routeParams, plantDetailsFactory) {

    // At the mpment we take all the needed Info from URL PArams which is uncool
    var plantId = $routeParams.plantID || "#",
        plant = plantDetailsFactory.getPlantDetails(plantId);

    $scope.plant = {};    
    $scope.plant.name = plant.name || "";
    $scope.plant.id   = plant.id || "#";
    $scope.plant.isOwnPlant = plant.own || false;
    $scope.plant.locations = plant.locations || [];

    $scope.savePlantPosition = function ( plantId ) {
      var position = { lat: '-14.22736', long: '45.22341' },
          newPosition = position || {};

      newPosition.range = $scope.range || 10;

      $scope.plant.locations = plantDetailsFactory.addPlantPositon( plantId, position );
    };
    
  });
