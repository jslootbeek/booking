'use strict';

/**
 * @ngdoc filter
 * @name bookingApp.filter:split
 * @function
 * @description
 * # split
 * Filter in the bookingApp.
 */
angular.module('bookingApp')
  .filter('split', function () {
    return function (input) {
      var splits = input.split("-");
      var start = new Date(parseInt(splits[0]));
      var end = new Date(parseInt(splits[1]));

      var startHours = start.getHours();
      var ampm = startHours < 12 ? "AM" : "PM";
      if (startHours > 12) {
        startHours -= 12;
      }
      var startString = startHours + ":" + ("00" + start.getMinutes()).slice(-2) + " " + ampm;

      var endHours = end.getHours();
      var ampm = endHours < 12 ? "AM" : "PM";
      if (endHours > 12) {
        endHours -= 12;
      }
      var endString = endHours + ":" + ("00" + end.getMinutes()).slice(-2) + " " + ampm;
      return startString + " - " + endString;
    };
  });
