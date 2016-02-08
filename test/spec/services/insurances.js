'use strict';

describe('Service: insurances', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var insurances;
  beforeEach(inject(function (_insurances_) {
    insurances = _insurances_;
  }));

  it('should do something', function () {
    expect(!!insurances).toBe(true);
  });

});
