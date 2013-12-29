'use strict';

describe('Service: Networkstatusservice', function () {

  // load the service's module
  beforeEach(module('krautli_yoApp'));

  // instantiate service
  var Networkstatusservice,
      rScope;


  // Initialize the service and a mock scope
  beforeEach(inject(function ($service, $rootScope) {
    rScope = $rootScope.$new();
    Networkstatusservice = $service('Networkstatusservice', {
      $rootScope: rScope
    });
  }));


  it('initially isOnline should be false', function () {
    expect(Networkstatusservice.isOnline()).toBe(false);
  });

  it('isOnline should be true if global flag is set online', function () {
    $rootScope.isOnline = true;
    expect(Networkstatusservice.isOnline()).toBe(true);
  });

  it('isOnline should be false if global flag is set to offline', function () {
    $rootScope.isOnline = false;
    expect(Networkstatusservice.isOnline()).toBe(false);
  });

});
