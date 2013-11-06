'use strict';

angular.module('krautli_yoApp')
  .controller('SuggestNameController', function ($scope) {

  	// still mocked - TODO:[LOW] replace with initial data
    $scope.plantNames = [
      { name: 'Ackergauchheil' },
      { name: 'Arnika' },
      { name: 'Beifuss' },
      { name: 'Eberesche' }
    ];
  });
