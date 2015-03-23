'use strict';
/*global Firebase */
/*
 * Created by Shtav.
 */

var app = angular.module('workoutLogApp');

app.controller('CreateCtrl', ['$scope','$firebase', '$firebaseArray', 'FB_URI', function ($scope, $firebase, $firebaseArray, FB_URI) {

  //=================
  //assignments and declarations
  //=================
  var info = 'create',
  ref = new Firebase(FB_URI+'/resources');

  $scope.newRef = $firebaseArray(ref);
  $scope.catRef = $scope.newRef;
  $scope.pageInfo = 'this is the ' +info+ ' page';


  //=================
  //functions
  //=================

  //=================
  //functions to scope
  //=================

  //=================
  //actions (do stuff)
  //=================
}]);
