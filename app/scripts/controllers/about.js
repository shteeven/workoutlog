'use strict';

/**
 * @ngdoc function
 * @name workoutLogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the workoutLogApp
 */
angular.module('workoutLogApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
