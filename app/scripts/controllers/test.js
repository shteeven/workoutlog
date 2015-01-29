'use strict';
/*global Firebase */
/** Created by Shtav on 12/8/14. **/


var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  $scope.this = 'this';
  var ref = new Firebase('https://finalize-test-app.firebaseIO.com/-JcrRUkOOoyEq7YGldxt');
  var sync = $firebase(ref.orderByChild('priority'));

  $scope.fireData = sync.$asArray();


}]);