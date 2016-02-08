'use strict';

/**
 * @ngdoc directive
 * @name bookingApp.directive:addDateForm
 * @description
 * # addDateForm
 */
angular.module('bookingApp')
  .directive('addDateForm', function () {
    return {
      templateUrl: 'views/date.html',
      restrict: 'EA',
      scope: {
        company: '='
      },
      controller: 'DateCtrl'
    };
  });
