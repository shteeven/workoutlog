'use strict';
/*global Firebase */
/**
 * @ngdoc function
 * @name workoutLogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workoutLogApp
 */
var app = angular.module('workoutLogApp');

app.controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  var ref = new Firebase('https://fiery-torch-1810.firebaseio.com/');
  var sync = $firebase(ref);
  $scope.fireData = sync.$asArray();

  function addItem(item){
    if(item){
      $scope.fireData.$add(['one','two','three']);
    }
  }
  function onDropComplete(index, item) {
    var itemIndex = $scope.fireData[0].indexOf(item);
    $scope.fireData[0].splice(itemIndex, 1);
    $scope.fireData[0].splice(index, 0, item);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(ref.key() === $scope.fireData[0].$id); // true
    });
  }
  function report(message){
    console.log(message);
  }

  $scope.addItem = addItem;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;
}]);
