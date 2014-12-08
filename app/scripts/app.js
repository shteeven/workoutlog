'use strict';

/**
 * @ngdoc overview
 * @name workoutLogApp
 * @description
 * # workoutLogApp
 *
 * Main module of the application.
 */
var app = angular.module('workoutLogApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngDragDrop',
  'firebase',
  'ngDraggable'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'TestCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope, $log){
  $rootScope.$log = $log.debug;
});