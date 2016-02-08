'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:CheckinCtrl
 * @description
 * # CheckinCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('CheckinCtrl', function ($scope, Ref, $firebaseArray, $filter, $timeout) {
    $scope.companies = $firebaseArray(Ref.child('clients'));
    $scope.companies.$loaded().catch(alert);

    $scope.getDate = function () {
      var today = new Date();
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo($scope.selectedCompany.$id));
      $scope.dates.$loaded(function (date) {
        date.forEach(function (current, index, array) {
          if (current.date === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) { $scope.date = current; }
        });
      }).catch(alert);
    };

    $scope.getSlot = function () {
      // find the appropriate slot
      $scope.slot = null;
      $scope.slotTime = null;
      for (var key in $scope.date.slots) {
        if (!key)  { continue; }
        var slot = $scope.date.slots[key];
        if (!slot.appointments || slot.appointments.length === 0) { continue; }
        slot.appointments.forEach(function (current) {
          if (current.email === $scope.email) {
            $scope.appointment = current;
            $scope.slotTime = key;
            return;
          }
        });
      }
    };

    $scope.checkin = function() {
      $scope.appointment.checkedInTime = new Date().getTime();
      $scope.dates.$save($scope.date);
      $scope.email = null;
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
