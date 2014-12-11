'use strict';

/**
 * Created by Shtav on 12/8/14.
 */
/*global Firebase */

var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  //=================
  //assignments and declarations
  //=================
  var ref = new Firebase('https://finalize-test-app.firebaseIO.com/-JcrRUkOOoyEq7YGldxt');
  var ref2 = new Firebase('https://finalize-test-app.firebaseIO.com/Main-List');

  //var ref = new Firebase('https://testapp-1494.firebaseIO.com/');
  var sync = $firebase(ref);
  var sync2 = $firebase(ref2);

  $scope.fireData = sync.$asArray();
  $scope.fireData2 = sync2.$asArray();


  //=================
  //functions
  //=================
  function report(message){console.log(message);}

  function compare(a, b) {
    if (a.priority > b.priority) {return 1;}
    if (a.priority < b.priority) {return -1;}
    return 0;// a must be equal to b
  }

  function addTest(name){
    var priority;
    if (!$scope.fireData2.length){
      report('no items');
      priority = 0;
    } else {
      priority = $scope.fireData2.length;
    }
    $scope.fireData2.$add({name: name, type: 'Virgo', completed: false, reps: 10, isNew:true, priority: priority}, 0);
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
      } else {
        report('Same same!');
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

  function saveChanges(item){ $scope.fireData.$save(item).then(function(){report(item);}); }


  //=================
  //functions to scope
  //=================
  $scope.addTest = addTest;
  $scope.addItemToList = addItemToList;
  $scope.deleteItemFromList = deleteItemFromList;
  $scope.saveChanges = saveChanges;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;


  //=================
  //actions (do stuff)
  //=================
  $scope.fireData.sort(compare);

  $scope.fireData.$watch(function() { $scope.fireData.sort(compare); });


}]);