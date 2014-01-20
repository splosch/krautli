'use strict';

angular.module('krautli_yoApp')
  .service('networkStatusService', function networkStatusService( $rootScope ) {
    
  	// checking network status for offline mode fallback
    this.isOnline = function() {
        return $rootScope.isOnline || false;
    };
  });
