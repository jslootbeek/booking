'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('CompanyCtrl', function ($scope, Ref, $firebaseArray, $timeout, states) {
    $scope.newCompany = {
      name: 'Company',
      location: {
        street: 'Street',
        street2: 'Street2',
        city: 'Boston',
        zip: '02122',
        state: 'MA',
        phone: '212-555-1212'
      },
      acceptedInsurances: []
    };

    $scope.states = states.all();

    // synchronize a read-only, synchronized array of companies, limit to most recent 10
    $scope.companies = $firebaseArray(Ref.child('clients'));
    $scope.insurances = $firebaseArray(Ref.child('insurances'));

    $scope.companies.$loaded().catch(alert);
    $scope.insurances.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addCompany = function (newCompany) {
      if (newCompany) {
        // push a message to the end of the array
       $scope.companies.$add(newCompany);
      }
    };

    $scope.getDates = function() {
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo($scope.selectedCompany.$id));
      $scope.dates.$loaded().catch(alert);
    };

    $scope.cancel = function(index, list) {
      list.appointments.splice(index, 1);
      //$scope.selectedDate.slots[slot].appointments.splice(index, 1);
      list.count = list.appointments.length;
      $scope.dates.$save($scope.selectedDate);
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
