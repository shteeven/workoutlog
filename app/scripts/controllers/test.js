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
  var ref = new Firebase('https://testapp-1494.firebaseIO.com/');
  var sync = $firebase(ref);
  $scope.fireData = sync.$asArray();


  //=================
  //functions
  //=================
  function report(message){console.log(message);}

  function compare(a, b) {
    if (a.reps > b.reps) {return 1;}
    if (a.reps < b.reps) {return -1;}
    return 0;// a must be equal to b
  }

  function addTest(name){
    var lastIndex = $scope.fireData.length - 1;
    report(lastIndex);
    var newReps = $scope.fireData[lastIndex].reps;
    $scope.fireData.$add({name: name, type: 'Virgo', completed: false, reps: newReps+1, isNew:false}, 0);
  }

  function onDropComplete(dropIndex, item) {
    var dragIndex = $scope.fireData.indexOf(item);
    item.reps = dropIndex;
    $scope.fireData.$save(dragIndex);
    if (dragIndex > dropIndex){
      while ($scope.fireData[dropIndex] && dropIndex !== dragIndex ){
        $scope.fireData[dropIndex].reps = dropIndex+1;
        $scope.fireData.$save(dropIndex);
        dropIndex++;
      }
    } else if(dragIndex < dropIndex){
      while ($scope.fireData[dropIndex] && dropIndex !== dragIndex ){
        $scope.fireData[dropIndex].reps = dropIndex-1;
        $scope.fireData.$save(dropIndex);
        dropIndex--;
      }
    } else {
      report('Same same!');
    }
  }

  function saveChanges(item){ $scope.fireData.$save(item).then(function(){report(item);}); }


  //=================
  //functions to scope
  //=================
  $scope.addTest = addTest;
  $scope.saveChanges = saveChanges;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;


  //=================
  //actions (do stuff)
  //=================
  $scope.fireData.sort(compare);

  $scope.fireData.$watch(function() { $scope.fireData.sort(compare); });

  ref.once('value', function(dataSnapshot) {
    dataSnapshot.forEach(function(childSnapshot) {
      report(childSnapshot.val());
    });
  });


}]);