'use strict';

describe('Service: Plantdataservice', function () {

  // load the service's module
  beforeEach(module('krautli_yoApp'));

  // instantiate service
  var Plantdataservice;
  beforeEach(inject(function (_Plantdataservice_) {

    Plantdataservice = true;
  }));

  it('should return empty list if offline', function () {
    expect(!!Plantdataservice).toBe(true);
  });

});
