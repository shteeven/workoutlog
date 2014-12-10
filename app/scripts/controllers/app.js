'use strict';

/**
 * Created by Shtav on 12/6/14.
 */

var app = angular.module('workoutLogApp');

app.controller('appCtrl', ['$scope', function ($scope) {

  function range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {input.push(i);}
    return input;
  }

  $scope.range = range;
}]);