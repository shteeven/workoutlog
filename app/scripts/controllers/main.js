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
  var ref = new Firebase("https://vkiw0dqfngi.firebaseio-demo.com/");
  var ref2 = new Firebase("https://fiery-torch-1810.firebaseio.com/");

  var sync = $firebase(ref2);
  $scope.list1 = sync.$asArray();
  function addItem(item){
    $scope.list1.$add(item);
    report(item);
  }
  $scope.messages = $firebase(ref).$asArray();

  $scope.list5 = [
    { 'title': 'Item 1', 'drag': true },
    { 'title': 'Item 2', 'drag': true },
    { 'title': 'Item 3', 'drag': true },
    { 'title': 'Item 4', 'drag': true },
    { 'title': 'Item 5', 'drag': true },
    { 'title': 'Item 6', 'drag': true },
    { 'title': 'Item 7', 'drag': true },
    { 'title': 'Item 8', 'drag': true }
  ];
  function removeItem(index){
    delete $scope.list1[index];
  }
  //ADD MESSAGE METHOD
  $scope.addMessage = function(e) {

    //LISTEN FOR RETURN KEY
    if (e.keyCode === 13 && $scope.msg) {
      //ALLOW CUSTOM OR ANONYMOUS USER NAMES
      var name = $scope.name || 'anonymous';
      $scope.messages.$add({from: name, body: $scope.msg});
      //RESET MESSAGE
      $scope.msg = "";
    }
  }
  function report(message){
    console.log(message);
  }

  $scope.report = report;
  $scope.addItem = addItem;
  $scope.removeItem = removeItem;
}]);
