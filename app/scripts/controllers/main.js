'use strict';

/**
 * @ngdoc function
 * @name workoutLogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workoutLogApp
 */
var app = angular.module('workoutLogApp');

app.controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  var ref = new Firebase("https://fiery-torch-1810.firebaseio.com/");
  var sync = $firebase(ref);
  $scope.draggableObjects = sync.$asArray();
  function addItem(item){
    if(item){
      $scope.draggableObjects.$add({name: item});
    }
  }

  $scope.onDropComplete = function (drop, drag, evt) {
    var dropItem = $scope.draggableObjects[drop];
    var storeIndex = $scope.draggableObjects.indexOf(holder);
    report(dropItem);
    var dragIndex = $scope.draggableObjects.indexOf(drag);
    var holder = dropItem;
    $scope.draggableObjects[drop] = drag;
    $scope.draggableObjects[dragIndex] = holder;
    $scope.draggableObjects.$save(drop).then(function(ref) {
      console.log($scope.draggableObjects.indexOf(holder));// true
    }, function(){
      console.log('fail');// false
    }); //save
    $scope.draggableObjects.$save(dragIndex); //save
  };


  function report(message){
    console.log(message);
  }
  $scope.addItem = addItem;
  $scope.report = report;
}]);
