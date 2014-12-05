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
  $scope.draggableObjects = [{name:'one',isNew:true}, {name:'two',isNew:true},{name:'three',isNew:true}, {name:'four',isNew:true}];

  //Use later to add workouts to main list
  function addItem(item){
    if(item){
      var obj = {name: item,isNew:false};
      $scope.fireData[0].push(obj);
      $scope.fireData.$save(0).then(function(ref) {
        console.log(ref.key() === $scope.fireData[0].$id); // true
      });
    }
  }

  function deleteItem(index){
    $scope.fireData[0].splice(index, 1);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(ref.key() === $scope.fireData[0].$id); // true
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

  $scope.deleteItem = deleteItem;
  $scope.addItem = addItem;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;
}]);
