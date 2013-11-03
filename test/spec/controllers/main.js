'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('krautli_yoApp'));
  // we are using Bootstrap style classes in our HTML so fire up the Bootstrap UI script to attach the functionality 
  // load the BootstrapUI module
  beforeEach(module('ui.bootstrap'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(4);
  });
});
