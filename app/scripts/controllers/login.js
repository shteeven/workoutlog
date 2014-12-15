/**
 * Created by Shtav on 12/15/14.
 */
'use strict';
/*global Firebase */

var app = angular.module('workoutLogApp');


app.controller('LoginCtrl', ['$scope', '$firebaseAuth', 'FIREBASE_URI', function ($scope, $firebaseAuth, FIREBASE_URI) {

  //=================
  //assignments and declarations
  //=================
  var ref = new Firebase(FIREBASE_URI);
  $scope.authObj = $firebaseAuth(ref);

  $scope.newUser = { email: '', password: '' };
  $scope.currentUser  = null;

  //=================
  //functions
  //=================
  function report(message){console.log(message);}

  function register(userInfo) {
    console.log(userInfo);
    console.log(userInfo.email);
    console.log(userInfo.password);
    $scope.authObj.$createUser(userInfo.email, userInfo.password).then(function() {
      console.log("User created successfully!");

      return $scope.authObj.$authWithPassword({
        email: userInfo.email,
        password: userInfo.password
      });
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $scope.resetForm()
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  }

  function login(userInfo) {
    $scope.authObj.$authWithPassword({
      email: userInfo.email,
      password: userInfo.password
    }).then(function(authData) {
      $scope.currentUser = user;
      $scope.resetForm();
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

  function resetForm() {
    $scope.newUser = { email: '', password: '' };
  }


  //=================
  //functions to scope
  //=================
  $scope.report = report;
  $scope.login = login;
  $scope.register = register;
  $scope.resetForm = resetForm

  //=================
  //actions (do stuff)
  //=================
}]);
