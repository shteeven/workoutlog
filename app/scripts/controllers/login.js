/**
 * Created by Shtav on 12/15/14.
 */
'use strict';
/*global Firebase */

var app = angular.module('workoutLogApp');

app.controller('LoginCtrl', ['$scope', '$firebase', function ($scope, $firebase) {


  //=================
  //assignments and declarations
  //=================

  //=================
  //functions
  //=================
  function report(message){console.log(message);}


  //=================
  //functions to scope
  //=================
 $scope.report = report;

  //=================
  //actions (do stuff)
  //=================
}]);
