'use strict';

describe('Service: trucks', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var trucks;
  beforeEach(inject(function (_trucks_) {
    trucks = _trucks_;
  }));

  it('should do something', function () {
    expect(!!trucks).toBe(true);
  });

});
