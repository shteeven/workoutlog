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
    'ngTouch'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(function($rootScope, $log){
    $rootScope.$log = $log.debug;
  });