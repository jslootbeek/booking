'use strict';

describe('Service: companies', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var companies;
  beforeEach(inject(function (_companies_) {
    companies = _companies_;
  }));

  it('should do something', function () {
    expect(!!companies).toBe(true);
  });

});
