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

app.constant('FIREBASE_URI', 'https://finalize-test-app.firebaseIO.com/');

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
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope, $log){
  $rootScope.$log = $log.debug;
});

app.controller('appCtrl', ['$scope', '$location', function ($scope, $location) {

  function range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {input.push(i);}
    return input;
  }
  $scope.isActive = function (viewLocation) {
    return (viewLocation === $location.path());
  };
  $scope.range = range;
}]);