'use strict';
/*global Firebase */
/** Created by Shtav on 12/8/14. **/


var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$http', '$firebase', 'UserService', function ($scope, $http, $firebase, UserService) {

  $scope.clientId = '120364084226-vqepl1idscd31900dlo880enf9n9hbd2';

  var ref = new Firebase("https://fiery-torch-1810.firebaseio.com");
  ref.onAuth(authDataCallback);
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });

  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      $scope.user = authData;
    } else {
      console.log("User is logged out");
    }
  }
  function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token + '&callback=JSON_CALLBACK';
    $http.jsonp(revokeUrl)
      .success( function(nullResponse) {$scope.user = undefined;})
      .error(function(err) {console.log(err);});
  }

  /*
  $scope.signedIn = function(oauth) {
    $scope.oauth = oauth;
    UserService.setCurrentUser(oauth)
      .then(function(user) {
        $scope.user = user;
      });
  };
  */

  $scope.signout = function(){disconnectUser($scope.user.google.access_token);};

}]);