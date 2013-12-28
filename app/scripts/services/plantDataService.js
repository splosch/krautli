'use strict';

angular.module('krautli_yoApp')
  .service('Plantdataservice', function Plantdataservice( $http ) {
    // Services as singleton are new to AngularJS => 
    //  => AngularJS will instantiate a singleton by calling "new" on this function

    /* `Plantdataservice` is a service to provide most up to date data about plants
     * GET plantList
     * GET plantDetailsById
     * POST ownPlantList

     * `Plantdataservice` provides a fallback to store data locally if no network connection can be estabished 
     */

    var service = {},
      appIsOffline = true;

    service.getNetworkStatus = function () {
      // do some html5 offline cache bla magic
      return appIsOffline;
    };    

    /* GET plantList
     * 
     * get a list of plant names that a user could search for
     */

    service.getPlantList = function () {
      var list = [];

      if ( appIsOffline ) {

        // try to fetch list from local storage
        list = [
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

      } else {
        // network is available try to fetch from server
        // go back to offline solution in case the request fails

        var queryOptions = { method:'GET', params:{}, isArray:true };

        list = $resource(
          '/scripts/data/plantData.js', 
          {}, 
          { query: queryOptions }
        );
      };
    };  


    // GET plantDetailsById
    // POST ownPlantList

  });
