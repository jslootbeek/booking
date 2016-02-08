'use strict';

/**
 * @ngdoc function
 * @name bookingApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the bookingApp
 */
angular.module('bookingApp')
  .controller('CompanyCtrl', function ($scope, $routeParams, Ref, $firebaseArray, $timeout, states) {
    $scope.selectedCompany = null;
    $scope.companyDisabled = false;

    $scope.newCompany = {
      acceptedInsurances: []
    };

    $scope.states = states.all();

    $scope.companies = $firebaseArray(Ref.child('clients'));
    $scope.insurances = $firebaseArray(Ref.child('insurances'));

    $scope.companies.$loaded().then(function (data) {
      if ($routeParams.companyName !== undefined) {
        data.forEach(function (current, index, array) {
          if (current.$id === $routeParams.companyName) {
            $scope.getDates(current);
            $scope.companyDisabled = true;
          }
        });
      }
    }).catch(alert);

    var activeSlot;
    $scope.selectedSlot = null;

    $scope.isActiveSlot = function (index) {
      return activeSlot === index;
    };

    $scope.selectSlot = function (index, slotData) {
      activeSlot = index;
      $scope.selectedSlot = slotData;
    };

    $scope.insurances.$loaded().then(function () {
      $scope.tmpInsurance = $scope.insurances[0];
    }).catch(alert);

    // provide a method for adding a message
    $scope.addCompany = function (newCompany) {
      if (newCompany) {
        // push a message to the end of the array
        $scope.companies.$add(newCompany).then(function (data) {
          $scope.msg = 'Company Added';
        });
      }
    };

    $scope.getDates = function (company) {
      $scope.dates = $firebaseArray(Ref.child('dates').orderByChild('company').equalTo(company.$id));
      $scope.selectedCompany = company;
      $scope.dates.$loaded().then(function () {
        $scope.selectedDate = $scope.dates[0];
      }).catch(alert);
    };

    $scope.clearSlots = function () {
      activeSlot = null;
      $scope.selectedSlot = null;
    };

    $scope.cancel = function (index, list) {
      list.appointments.splice(index, 1);
      list.count = list.appointments.length;
      $scope.dates.$save($scope.selectedDate).then(function (response) {
      });
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
