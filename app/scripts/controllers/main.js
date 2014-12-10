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

  //Use to add workouts to main list
  function addItem(name, type, reps){
    if(name && type){
      var obj = {name: name, type: type, completed: false, reps: reps, isNew:true};
      var added = false;
      var i = 0;
      while (added == false){
        if (!$scope.fireData[1][i]){
          $scope.fireData[1][i] = obj;
          $scope.fireData.$save(1).then(function(ref) {
            console.log(ref.key() === $scope.fireData[1].$id); // true
          });
          added = true;
        }
        i++;
      }
      $scope.itemName = "";
      $scope.itemType = "";
      $scope.itemReps = "";
    }
  }
  function deleteItem(index){
    delete $scope.fireData[1][index];
    $scope.fireData.$save(1).then(function(ref) {
      console.log(ref.key() === $scope.fireData[1].$id); // true
    });
  }

  function deleteItemFromList(index){
    $scope.fireData[0].splice(index, 1);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(ref.key() === $scope.fireData[0].$id); // true
    });
  }
  function addItemToList(item){
    item = angular.copy(item);
    item.isNew = false;
    $scope.fireData[0].push(item);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(true); // true
    });
  }

  function onDropComplete(index, item) {
    if (item.isNew === false){
      var itemIndex = $scope.fireData[0].indexOf(item);
      $scope.fireData[0].splice(itemIndex, 1);
      $scope.fireData[0].splice(index, 0, item);
      $scope.fireData.$save(0).then(function(ref) {
        console.log(ref.key() === $scope.fireData[0].$id); // true
      });
    } else if(item.isNew === true){
      var newItem = angular.copy(item);
      newItem.isNew = false;
      $scope.fireData[0].splice(index, 0, newItem);
      $scope.fireData.$save(0).then(function(ref) {
        console.log(ref.key() === $scope.fireData[0].$id); // true
      });
    }
  }
  function report(message){
    console.log(message);
  }

  $scope.addItemToList = addItemToList;
  $scope.deleteItemFromList = deleteItemFromList;
  $scope.addItem = addItem;
  $scope.deleteItem = deleteItem;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;
}]);
