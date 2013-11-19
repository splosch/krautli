'use strict';

describe('Service: Plantdataservice', function () {

  // load the service's module
  beforeEach(module('krautli_yoApp'));

  // instantiate service
  var Plantdataservice;
  beforeEach(inject(function (_Plantdataservice_) {
    Plantdataservice = _Plantdataservice_;
  }));

  it('should do something', function () {
    expect(!!Plantdataservice).toBe(true);
  });

});
