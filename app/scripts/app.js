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
    .when('/mypage', {
      templateUrl: 'views/mypage.html',
      controller: 'MyPageCtrl'
    })
    .when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    })
    .when('/browse', {
      templateUrl: 'views/browse.html',
      controller: 'BrowseCtrl'
    })
    .when('/discuss', {
      templateUrl: 'views/discuss.html',
      controller: 'DiscussCtrl'
    })
    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'TestCtrl'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminCtrl'
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
    if ($scope.user){
      $scope.user.name = FBUserService.userData(authData);
    }
  });
  $scope.logClicked = function(){
    $scope.check = !$scope.check;
  };

  $scope.colorMe = function(id) {
    var c;
    switch(id) {
      case 'facebook':
        c = 'btn-primary';
        break;
      case 'github':
        c = 'btn-inverse';
        break;
      case 'twitter':
        c = 'btn-info';
        break;
      default:
        c = '';
    }
    return !$scope.preferred || $scope.preferred.id === id? c : '';
  };

  function signIn(type, email, password){
    FBUserService.logIn(type, email, password);
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

  $scope.showModal = false;
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  };

}]);