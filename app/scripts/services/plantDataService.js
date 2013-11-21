'use strict';

angular.module('krautli_yoApp')
  .service('Plantdataservice', function Plantdataservice( $resource ) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var plantData = $resource('/scripts/data/plantData.js', {},
        {
            query: {method:'GET', params:{}, isArray:true}
        });
    return plantData;
  });
