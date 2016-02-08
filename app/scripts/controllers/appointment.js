'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('AppointmentCtrl', function ($scope, Ref, $firebaseObject, $firebaseArray, $timeout, states) {
    $scope.states = states.all();

    $scope.reasons = $firebaseArray(Ref.child('reasons'));
    $scope.reasons.$loaded().catch(alert);

    $scope.companies = $firebaseArray(Ref.child('clients'));
    $scope.companies.$loaded().catch(alert);

    $scope.patientData = {
      reasons: []
    };

    $scope.getDates = function() {
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo($scope.newAppointment.company.$id));
      $scope.dates.$loaded().then(function() {
        $scope.newAppointment.date = $scope.dates[0];
      }).catch(alert);
    };

    $scope.addAppointment = function(newAppointment) {
      if (newAppointment) {
        if (!newAppointment.date.slots[newAppointment.selectedSlot].appointments) {
          newAppointment.date.slots[newAppointment.selectedSlot].appointments = [];
        }
        newAppointment.date.slots[newAppointment.selectedSlot].appointments.push($scope.patientData);
        newAppointment.date.slots[newAppointment.selectedSlot].count = newAppointment.date.slots[newAppointment.selectedSlot].appointments.length;
        $scope.dates.$save(newAppointment.date).then(function(data) {
          $scope.msg = "Your appointment was made."
        });
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
