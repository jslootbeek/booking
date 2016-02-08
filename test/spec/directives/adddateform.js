'use strict';

describe('Directive: addDateForm', function () {

  // load the directive's module
  beforeEach(module('bookingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-date-form></add-date-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addDateForm directive');
  }));
});
