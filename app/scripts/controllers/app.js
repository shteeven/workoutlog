'use strict';

/**
 * Created by Shtav on 12/6/14.
 */

var app = angular.module('workoutLogApp');

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