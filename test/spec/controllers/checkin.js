'use strict';

describe('Controller: CheckinCtrl', function () {

  // load the controller's module
  beforeEach(module('bookingApp'));

  var CheckinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckinCtrl = $controller('CheckinCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CheckinCtrl.awesomeThings.length).toBe(3);
  });
});
