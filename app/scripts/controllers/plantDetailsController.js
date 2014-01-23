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
        var plant =  plants[id] || null;

        if (plant) {
          plant.id = id;
        }

        return plant;
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
    
  });
