/**
 * Created by Shtav on 12/8/14.
 */

var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  var ref = new Firebase('https://fiery-torch-1810.firebaseio.com/');
  var sync = $firebase(ref);
  $scope.fireData = sync.$asArray();

  //Use to add workouts to main list
  function addItem(name, type, reps){
    if(name && type){
      var obj = {name: name, type: type, completed: false, reps: reps, isNew:true};
      var added = false;
      var i = 0;
      while (added == false){
        if (!$scope.fireData[1][i]){
          $scope.fireData[1][i] = obj;
          $scope.fireData.$save(1).then(function(ref) {
            console.log(ref.key() === $scope.fireData[1].$id); // true
          });
          added = true;
        }
        i++;
      }
      $scope.itemName = "";
      $scope.itemType = "";
      $scope.itemReps = "";
    }
  }
  function deleteItem(index){
    delete $scope.fireData[1][index];
    $scope.fireData.$save(1).then(function(ref) {
      console.log(ref.key() === $scope.fireData[1].$id); // true
    });
  }

  function deleteItemFromList(index){
    $scope.fireData[0].splice(index, 1);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(ref.key() === $scope.fireData[0].$id); // true
    });
  }
  function addItemToList(item){
    $scope.fireData[0].push(item);
    $scope.fireData.$save(0).then(function(ref) {
      console.log(true); // true
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

  $scope.addItemToList = addItemToList;
  $scope.deleteItemFromList = deleteItemFromList;
  $scope.addItem = addItem;
  $scope.deleteItem = deleteItem;
  $scope.report = report;
  $scope.onDropComplete = onDropComplete;




  $scope.myList = getSynchronizedArray(ref);

  $scope.reportThis = function(){console.log($scope.myList)};

  function getSynchronizedArray(firebaseRef) {
    var list = [];
    syncChanges(list, firebaseRef);
    wrapLocalCrudOps(list, firebaseRef);
    return list;
  }

  function syncChanges(list, ref) {
    ref.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = positionAfter(list, prevChild);
      list.splice(pos, 0, data);
    });
    ref.on('child_removed', function _remove(snap) {
      var i = positionFor(list, snap.key());
      if( i > -1 ) {
        list.splice(i, 1);
      }
    });
    ref.on('child_changed', function _change(snap) {
      var i = positionFor(list, snap.key());
      if( i > -1 ) {
        list[i] = snap.val();
        list[i].$id = snap.key(); // assumes data is always an object
        console.log(list[i].$id)
      }
    });
    ref.on('child_moved', function _move(snap, prevChild) {
      var curPos = positionFor(list, snap.key());
      if( curPos > -1 ) {
        var data = list.splice(curPos, 1)[0];
        var newPos = positionAfter(list, prevChild);
        list.splice(newPos, 0, data);
      }
    });
  }

  function wrapLocalCrudOps(list, firebaseRef) {
    // we can hack directly on the array to provide some convenience methods
    list.$add = function(data) {
      return firebaseRef.push(data);
    };
    list.$remove = function(key) {
      firebaseRef.child(key).remove();
    };
    list.$set = function(key, newData) {
      // make sure we don't accidentally push our $id prop
      if( newData.hasOwnProperty('$id') ) { delete newData.$id; }
      firebaseRef.child(key).set(newData);
    };
    list.$indexOf = function(key) {
      return positionFor(list, key); // positionFor in examples above
    }
  }

// similar to indexOf, but uses id to find element
  function positionFor(list, key) {
    for(var i = 0, len = list.length; i < len; i++) {
      if( list[i].$id === key ) {
        return i;
      }
    }
    return -1;
  }

// using the Firebase API's prevChild behavior, we
// place each element in the list after it's prev
// sibling or, if prevChild is null, at the beginning
  function positionAfter(list, prevChild) {
    if( prevChild === null ) {
      return 0;
    }
    else {
      var i = positionFor(list, prevChild);
      if( i === -1 ) {
        return list.length;
      }
      else {
        return i+1;
      }
    }
  }

}]);