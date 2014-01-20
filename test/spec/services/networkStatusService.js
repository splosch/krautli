'use strict';

describe('Service: networkStatusService', function () {

  // load the service's module
  beforeEach(module('krautli_yoApp'));

  // instantiate service
  var networkStatusService,
      scope;

  beforeEach(inject(function (_networkStatusService_, $rootScope) {
    scope = $rootScope.$new();

    networkStatusService = _networkStatusService_.$new( scope );
  }));


  it('initially isOnline should be false', function () {
    expect(networkStatusService.isOnline()).toBe(false);
  });

  it('isOnline should be true if global flag is set online', function () {
    scope.isOnline = true;
    expect(networkStatusService.isOnline()).toBe(true);
  });

  it('isOnline should be false if global flag is set to offline', function () {
    scope.isOnline = false;
    expect(networkStatusService.isOnline()).toBe(false);
  });


});
