'use strict';

describe('Controller: AppointmentCtrl', function () {

  // load the controller's module
  beforeEach(module('bookingApp'));

  var AppointmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppointmentCtrl = $controller('AppointmentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppointmentCtrl.awesomeThings.length).toBe(3);
  });
});
