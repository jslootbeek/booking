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
      var startString = "";
      if (startHours > 12) {
        startHours -= 12;
        startString = startHours + ":" + ("00" + start.getMinutes()).slice(-2) + " PM";
      } else {
        startString = startHours + ("00" + start.getMinutes()).slice(-2) + " AM";
      }

      var endHours = end.getHours();
      var endString = "";
      if (endHours > 12) {
        endHours -= 12;
        endString = endHours + ":" + ("00" + end.getMinutes()).slice(-2) + " PM";
      } else {
        endString = endHours + ("00" + end.getMinutes()).slice(-2) + " AM";
      }
      return startString + " - " + endString;
    };
  });
