/**
 * Created by Shtav on 12/8/14.
 */

var app = angular.module('workoutLogApp');

app.controller('TestCtrl', ['$scope', function ($scope) {
  function getSynchronizedArray(firebaseRef) {
    var list = [];
    syncChanges(list, firebaseRef);
    return list;
  }


  function syncChanges(list, ref) {
    ref.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = positionAfter(list, prevChild);
      list.splice(pos, 0, data);
    });
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