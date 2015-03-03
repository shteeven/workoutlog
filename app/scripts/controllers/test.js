'use strict';
/*global Firebase */
/** Created by Shtav on 12/8/14. **/


var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$http', '$firebase', 'UserService', function ($scope, $http, $firebase, UserService) {

  $scope.clientId = '120364084226-vqepl1idscd31900dlo880enf9n9hbd2';

  var ref = new Firebase("https://fiery-torch-1810.firebaseio.com");
  var isNewUser = false;
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into Firebase so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData)
      });
    }
  });
  function signIn(){
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) { console.log("Login Failed!", error);}
      else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.$apply(function(){$scope.user = authData;});
      }
    })
  }
  function getName(authData) {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*/, '');
      case 'twitter':
        return authData.twitter.displayName;
      case 'facebook':
        return authData.facebook.displayName;
      case 'google':
        return authData.google.displayName;
    }
  }
  function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token + '&callback=JSON_CALLBACK';
    $http.jsonp(revokeUrl)
      .success( function(nullResponse) {$scope.user = undefined;})
      .error(function(err) {console.log(err);});
  }
  function signout(){
    ref.unauth();
    disconnectUser($scope.user.google.accessToken);
    $scope.user = undefined;
  }
  function log(m){
    console.log(m);
  }
  $scope.doIt = function() {
    var usersRef = ref.child("lists");
    var myObj = {
      body: "asdfghjk",
      userId: $scope.user.uid
    };
    usersRef.push(myObj);
    console.log(myObj);
    console.log('what');

  };

  $scope.signout = signout;
  $scope.log = log;
  $scope.signIn = signIn;

}]);