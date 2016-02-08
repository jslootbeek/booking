'use strict';

/**
 * @ngdoc overview
 * @name bookingApp
 * @description
 * # bookingApp
 *
 * Main module of the application.
 */
var bookingApp = angular.module('bookingApp', [
  'ngAnimate',
  'firebase',
  'firebase.ref',
  'ngRoute',
  'checklist-model'
]);

bookingApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/company', {
      templateUrl: 'views/company.html',
      controller: 'CompanyCtrl'
    })
    .when('/appointment', {
      templateUrl: 'views/appointment.html',
      controller: 'AppointmentCtrl',
      controllerAs: 'appointment'
    })
    .when('/checkin', {
      templateUrl: 'views/checkin.html',
      controller: 'CheckinCtrl'
    });
});
