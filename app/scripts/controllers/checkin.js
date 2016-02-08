'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:CheckinCtrl
 * @description
 * # CheckinCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('CheckinCtrl', function ($scope, Ref, $routeParams, $firebaseArray, $filter, $timeout) {
    $scope.companies = $firebaseArray(Ref.child('clients'));
    $scope.companies.$loaded().then(function(data) {
      if ($routeParams.companyName === undefined) return;
      data.forEach(function(current, index, array) {
        if (current.$id === $routeParams.companyName) {
          $scope.getDate(current);
          $scope.companyDisabled = true;
        }
      });
    }).catch(alert);

    $scope.getDate = function (company) {
      var today = new Date();
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo(company.$id));
      $scope.selectedCompany = company;
      $scope.dates.$loaded(function (date) {
        date.forEach(function (current, index, array) {
          if (current.date === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) {
            $scope.date = current;
          }
        });
      }).catch(alert);
    };

    $scope.getSlot = function () {
      // find the appropriate slot
      $scope.slot = null;
      $scope.slotTime = null;
      for (var key in $scope.date.slots) {
        if (!key) {
          continue;
        }
        var slot = $scope.date.slots[key];
        if (!slot.appointments || slot.appointments.length === 0) {
          continue;
        }
        if (slot.appointments[0].email === $scope.email) {
          $scope.appointment = slot.appointments[0];
          $scope.slotTime = key;
          return;
        }
      }
    };

    $scope.checkin = function () {
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
