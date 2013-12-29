'use strict';

angular.module('krautli_yoApp')
  .service('Networkstatuservice', function Networkstatuservice( $rootScope ) {
    
  	// checking network status for offline mode fallback
    this.isOnline = function() {
        return $rootScope.isOnline || false;
    };
  });
