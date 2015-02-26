'use strict';
/*global Firebase */
/** Created by Shtav on 12/8/14. **/


var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  $scope.clientId = '120364084226-72omk2fl5mu05vdb765heq23r5lt9dh1';

  function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token + '&callback=JSON_CALLBACK';
    $http.jsonp(revokeUrl)
      .success( function(nullResponse) {$scope.user = undefined;})
      .error(function(err) {console.log(err);});
  }

  $scope.signedIn = function(oauth) {
    $scope.oauth = oauth;
    UserService.setCurrentUser(oauth)
      .then(function(user) {
        $scope.user = user;
      });
  };

  $scope.signout = function(){disconnectUser($scope.oauth.access_token);};

}]);