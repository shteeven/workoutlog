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

  //=================
  //assignments and declarations
  //=================
  var ref = new Firebase('https://finalize-test-app.firebaseIO.com/-JcrRUkOOoyEq7YGldxt');
  var ref2 = new Firebase('https://finalize-test-app.firebaseIO.com/Main-List');

  var sync = $firebase(ref.orderByChild('priority'));
  var sync2 = $firebase(ref.orderByChild('priority'));

  $scope.fireData = sync.$asArray();
  $scope.fireData2 = sync2.$asArray();

  //=================
  //functions
  //=================
  function report(message){console.log(message);}


  function createItem(name){
    var priority;
    if(name) {
      if (!$scope.fireData2.length) {
        priority = 0;
      } else {
        priority = $scope.fireData2.length;
      }
      $scope.fireData2.$add({
        name: name,
        type: 'Virgo',
        completed: false,
        reps: 10,
        isNew: true,
        priority: priority
      }, 0);
    }
  }

  function addItemToList(item){
    var priority;
    if (!$scope.fireData.length){ priority = 0;
    } else { priority = $scope.fireData.length; }

    item.priority = priority;
    item.isNew = false;
    $scope.fireData.$add(item);
  }

  function onDropComplete(dropIndex, item) {
    if (!item.isNew){
      var dragIndex = $scope.fireData.indexOf(item);
      item.priority = dropIndex;
      $scope.fireData.$save(dragIndex);
      if (dragIndex > dropIndex){
        while ($scope.fireData[dropIndex] && dropIndex !== dragIndex ){
          $scope.fireData[dropIndex].priority = dropIndex+1;
          $scope.fireData.$save(dropIndex);
          dropIndex++;
        }
      } else if(dragIndex < dropIndex){
        while ($scope.fireData[dropIndex] && dropIndex !== dragIndex ){
          $scope.fireData[dropIndex].priority = dropIndex-1;
          $scope.fireData.$save(dropIndex);
          dropIndex--;
        }
      }
    } else if (item.isNew){
      item = angular.copy(item);
      item.isNew = false;
      item.priority = dropIndex;
      $scope.fireData.$add(item);
      while ($scope.fireData[dropIndex]){
        $scope.fireData[dropIndex].priority = dropIndex+1;
        $scope.fireData.$save(dropIndex);
        dropIndex++;
      }
    }
  }

  function deleteItemFromList(item){ $scope.fireData.$remove(item); }

  function deleteItemFromMainList(item){ $scope.fireData2.$remove(item); }

  function saveChanges(item){ $scope.fireData.$save(item).then(function(){report(item);}); }


  //=================
  //functions to scope
  //=================
  $scope.createItem = createItem;
  $scope.addItemToList = addItemToList;
  $scope.deleteItemFromList = deleteItemFromList;
  $scope.deleteItemFromMainList = deleteItemFromMainList;
  $scope.saveChanges = saveChanges;
  $scope.onDropComplete = onDropComplete;
  $scope.report = report;

  //=================
  //actions (do stuff)
  //=================
}]);
