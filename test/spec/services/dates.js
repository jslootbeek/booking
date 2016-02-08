'use strict';

describe('Service: dates', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var dates;
  beforeEach(inject(function (_dates_) {
    dates = _dates_;
  }));

  it('should do something', function () {
    expect(!!dates).toBe(true);
  });

});
