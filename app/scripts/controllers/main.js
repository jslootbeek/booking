'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
