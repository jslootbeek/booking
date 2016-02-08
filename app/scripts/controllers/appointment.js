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
      first: 'Steve',
      last: 'Jobs',
      phone: '6175551212',
      email: 'steve@apple.com',
      reasons: []
    };

    $scope.getDates = function() {
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo($scope.newAppointment.company.$id));
      $scope.dates.$loaded().catch(alert);
    };

    $scope.addAppointment = function(newAppointment) {
      if (newAppointment) {
        if (!newAppointment.date.slots[newAppointment.selectedSlot].appointments) {
          newAppointment.date.slots[newAppointment.selectedSlot].appointments = []
        }
        newAppointment.date.slots[newAppointment.selectedSlot].appointments.push($scope.patientData);
        newAppointment.date.slots[newAppointment.selectedSlot].count = newAppointment.date.slots[newAppointment.selectedSlot].appointments.length;
        $scope.dates.$save(newAppointment.date);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
