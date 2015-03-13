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

app.constant('FB_URI', 'https://fiery-torch-1810.firebaseIO.com/');

app.controller('AppCtrl', ['$scope', '$location', 'FBUserService', function($scope, $location, FBUserService){
  $scope.authWaiting = true;
  FBUserService.currentUser();

  var authObj = FBUserService.authObj();
  authObj.$onAuth(function(authData) {
    $scope.user = authData;
  });
  FBUserService.userData();
  $scope.logClicked = function(){
    $scope.check = !$scope.check;
  };

  function signIn(type, email, password){
    FBUserService.logIn(type);
  }
  function signOut(){
    FBUserService.signOut();
    $scope.user = undefined;
  }
  function isActive(viewLocation) {
    return (viewLocation === $location.path());
  }
  function log(m){
    console.log(m);
  }

  $scope.signIn = signIn;
  $scope.log = log;
  $scope.isActive = isActive;
  $scope.signOut = signOut;

}]);