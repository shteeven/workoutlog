'use strict';

/**
 * @ngdoc overview
 * @name workoutLogApp
 * @description
 * # workoutLogApp
 *
 * Main module of the application.
 */
angular.module('workoutLogApp', [
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
var app = angular.module('workoutLogApp');

app.constant('FIREBASE_URI', 'https://fiery-torch-1810.firebaseIO.com/');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        userLists: function ($q, $timeout) { //todo write function to return user list data before ctrl runs
          var defer = $q.defer;
          defer.resolve(
            
          );

          return defer.promise;
        }
      }
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

app.controller('appCtrl', ['$scope', '$location', function ($scope, $location) {

  function range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {input.push(i);}
    return input;
  }
  function isActive(viewLocation) {
    return (viewLocation === $location.path());
  }

  $scope.range = range;
  $scope.isActive = isActive;

}]);