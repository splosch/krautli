'use strict';

angular.module('krautli_yoApp')
  .factory('plantsFactory', function () {
      var factory = {},
          // plants shall be fetched via network and persisted as objects locally
          plants = [
            { 
              id: 1,
              name: 'Ackergauchheil',
              latname: 'Botansi ackergauli sanctum' 
            },
            { 
              id: 2,
              name: 'Arnika',
              latname: 'Fevelus satinum',
              own: true 
            },
            { 
              id: 3,
              name: 'Beifuss',
              latname: 'Vehennis lam. natus' 
            },
            { 
              id: 4,
              name: 'Eberesche', 
              own: true,
              locations: [ 
                { lat: '-20.223', long: '45.099' },
                { lat: '-13.200', long: '15.013' }
              ]
            },
            { 
              id: 8,
              name: 'Dreibla',
              latname: 'Trebla trebli max.' 
            }
          ]; 


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

      factory.getPlantById = function (id) {
        var foundPlant; 

        if(!id){
          return false;
        }

        // find plant with id = plant.id
        plants.forEach(function(plant, index){
          if(plant.id === id){
            foundPlant = plant;
          }
        });

        return foundPlant;
      },   

      factory.addPlantPositon = function ( plant, pos ) {
        var locations = [];
        debugger;
        if(plant && pos && pos.lat && pos.long) {
          locations = plant.locations || [];
          locations.push( pos );
          plant.locations = locations;
        }

        return plant.locations;
      };  

      return factory;
  })
  .controller('PlantDetailsController', function ($scope, $route, $routeParams, plantsFactory) {

    // At the mpment we take all the needed Info from URL PArams which is uncool
    var plantId = parseInt($routeParams.plantID, 10),
        plant = plantsFactory.getPlantById(plantId);

    $scope.plant = {};    
    $scope.plant.name = plant.name || "";
    $scope.plant.latname = plant.latname || "n.a."
    $scope.plant.id   = plant.id || "#";
    $scope.plant.isOwnPlant = plant.own || false;
    $scope.plant.locations = plant.locations || [];

    $scope.savePlantPosition = function () {
      var position = { lat: '-14.22736', long: '45.22341' },
          newPosition = position || {};

      newPosition.range = $scope.radius;

      $scope.plant.locations = plantsFactory.addPlantPositon( plant, newPosition );
    };
    
  });
