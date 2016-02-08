'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:DateCtrl
 * @description
 * # DateCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('DateCtrl', function ($scope, Ref, $firebaseArray, $timeout) {

    $scope.breakStart = new Date(1970, 0, 1, 12, 0, 0);
    $scope.breakEnd = new Date(1970, 0, 1, 13, 0, 0);
    $scope.newDate = {
      date: new Date(2016, 1, 7),
      startTime: new Date(1970, 0, 1, 11, 0, 0),
      endTime: new Date(1970, 0, 1, 14, 0, 0)
    };
    // synchronize a read-only, synchronized array of companies, limit to most recent 10
    $scope.dates = $firebaseArray(Ref.child('dates'));
    $scope.trucks = $firebaseArray(Ref.child('trucks'));

    // display any errors
    $scope.dates.$loaded().catch(alert);
    $scope.trucks.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addDate = function (newDate) {
      if (newDate) {
        newDate.company = $scope.company.$id;
        newDate.slots = {};
        newDate.startDate = newDate.date.getTime() + newDate.startTime.getTime();
        newDate.endDate = newDate.date.getTime() + newDate.endTime.getTime();

        // generate slots
        var tenMinutes = 1000 * 60 * 10;
        var count = 0;
        var start = newDate.startDate;
        while(start < newDate.endDate) {
          var end = start + tenMinutes;
//           console.log(new Date(start), new Date(end));
//           console.log(start, newDate.date.getTime() + $scope.breakStart.getTime(), start < newDate.date.getTime() + $scope.breakStart.getTime());
//           console.log(start, newDate.date.getTime() + $scope.breakEnd.getTime(), start >= newDate.date.getTime() + $scope.breakEnd.getTime());
//           console.log(count, (count + 1) % 6, (count + 1) % 6 != 0);
          if ((start < newDate.date.getTime() + $scope.breakStart.getTime() || start >= newDate.date.getTime() + $scope.breakEnd.getTime()) &&  ++count % 6 !== 0) {
//             console.log("creating slot " + count);
            newDate.slots[start + '-' + end] = {count: 0, appointments: []};
          }
          start = end;
        }
        console.log(newDate);
        newDate.date = newDate.date.getTime();
        // push a message to the end of the array
        $scope.dates.$add(newDate)
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
