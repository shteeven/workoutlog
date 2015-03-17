'use strict';
/*global Firebase */
/** Created by Shtav on 12/8/14. **/


var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
  $scope.uInput = '';

  var url = 'https://fiery-torch-1810.firebaseio.com';

  var ref = new Firebase(url);
  var ref2 = new Firebase(url+ '/lists');

  $scope.sync2 = $firebase(ref2).$asArray();


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
  var isNewUser = false;

  function report(){
    console.log($scope.readData)
  }

  function deletePost(post){
    var postKey = post.key();
  }
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
  }
  function log(m){
    console.log(m);
  }
  function doIt() {
    var usersLists = ref.child("lists").child($scope.user.uid);
    var myObj = {
      body: $scope.uInput,
      userId: $scope.user.uid
    };
    usersLists.push(myObj);
    console.log(myObj);
    console.log('what');
  }
  function deleteItem(user, key){
    log(user);
    log(key);
    log(user[key]);
    var itemRef = new Firebase(url + '/lists/' + user.$id + '/' + key);
    itemRef.remove();
  }



  $scope.doIt = doIt;
  $scope.signout = signout;
  $scope.log = log;
  $scope.signIn = signIn;
  $scope.report = report;
  $scope.deletePost = deletePost;
  $scope.deleteItem = deleteItem;


//=================  //=================  //=================
  //=================  //=================  //=================
  //=================  //=================  //=================
  //=================  //=================  //=================

  //=================
  //assignments and declarations
  //=================
  var ref = new Firebase('https://finalize-test-app.firebaseIO.com/-JcrRUkOOoyEq7YGldxt');
  var ref2 = new Firebase('https://finalize-test-app.firebaseIO.com/Main-List');

  var sync = $firebase(ref.orderByChild('priority'));
  var sync2 = $firebase(ref2.orderByChild('priority'));

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