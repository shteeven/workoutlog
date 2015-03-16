'use strict';
/**
 * Created by Shtav on 3/15/15.
 */

var app = angular.module('workoutLogApp');

app.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
});