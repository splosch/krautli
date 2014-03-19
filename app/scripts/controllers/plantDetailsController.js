'use strict';

angular.module('krautli_yoApp')
  .factory('plantsFactory', function () {
      var factory = {},
          // plants shall be fetched via network and persisted as objects locally
          plants = { 
            1 : { id: 1,
                  name: 'Ackergauchheil',
                  latname: 'Botansi ackergauli sanctum' },
            2 : { id: 2,
                  name: 'Arnika',
                  latname: 'Fevelus satinum',
                  own: true },
            3 : { id: 3,
                  name: 'Beifuss',
                  latname: 'Vehennis lam. natus' },
            4 : { id: 4,
                  name: 'Eberesche', 
                  own: true,
                  locations: [ 
                    { lat: '-20.223', long: '45.099' },
                    { lat: '-13.200', long: '15.013' }
                  ]
                },
            8 : { id: 8,
                  name: 'Dreibla',
                  latname: 'Trebla trebli max.' }
          }; 


      factory.getPlantList = function () {
        return plants;
      };    

      factory.addPlant = function ( plant ) {
        plants.push( plant );
        return plants;
      };  

      factory.newPlantId = function () {
        return plants.length + 1;
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
  .controller('PlantDetailsController', function ($scope, $route, $routeParams, plantsFactory) {

    // At the mpment we take all the needed Info from URL PArams which is uncool
    var plantId = $routeParams.plantID || "#",
        plant = plantsFactory.getPlantDetails(plantId);

    $scope.plant = {};    
    $scope.plant.name = plant.name || "";
    $scope.plant.latname = plant.latname || "n.a."
    $scope.plant.id   = plant.id || "#";
    $scope.plant.isOwnPlant = plant.own || false;
    $scope.plant.locations = plant.locations || [];

    $scope.savePlantPosition = function ( plantId ) {
      var position = { lat: '-14.22736', long: '45.22341' },
          newPosition = position || {};

      newPosition.range = $scope.radius;

      $scope.plant.locations = plantsFactory.addPlantPositon( plantId, newPosition );
    };
    
  });
