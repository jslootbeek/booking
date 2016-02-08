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
      startTime: new Date(1970, 0, 1, 8, 0, 0),
      endTime: new Date(1970, 0, 1, 17, 0, 0)
    };

    $scope.dates = $firebaseArray(Ref.child('dates'));
    $scope.trucks = $firebaseArray(Ref.child('trucks'));

    // display any errors
    $scope.dates.$loaded().catch(alert);
    $scope.trucks.$loaded().then(function() {
      $scope.newDate.truck = $scope.trucks[0].$id;
    }).catch(alert);

    // provide a method for adding a message
    $scope.addDate = function (newDate) {
      if (newDate) {
        newDate.company = $scope.company.$id;
        newDate.slots = {};
        newDate.startDate = new Date(newDate.date.getFullYear(), newDate.date.getMonth(), newDate.date.getDate(), newDate.startTime.getHours(), newDate.startTime.getMinutes()).getTime();
        newDate.endDate = new Date(newDate.date.getFullYear(), newDate.date.getMonth(), newDate.date.getDate(), newDate.endTime.getHours(), newDate.endTime.getMinutes()).getTime();

        var breakStartTime = new Date(newDate.date.getFullYear(), newDate.date.getMonth(), newDate.date.getDate(), $scope.breakStart.getHours(), $scope.breakStart.getMinutes()).getTime();
        var breakEndTime = new Date(newDate.date.getFullYear(), newDate.date.getMonth(), newDate.date.getDate(), $scope.breakEnd.getHours(), $scope.breakEnd.getMinutes()).getTime();
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
          if ((start < breakStartTime || start >= breakEndTime) &&  ++count % 6 !== 0) {
//             console.log("creating slot " + count);
            newDate.slots[start + '-' + end] = {count: 0, appointments: []};
          }
          start = end;
        }
        console.log(newDate);
        newDate.date = newDate.date.getTime();
        // push a message to the end of the array
        $scope.dates.$add(newDate).then(function(data){
          $scope.msg = 'Date added.';
        })
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
