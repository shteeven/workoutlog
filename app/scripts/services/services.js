'use strict';

/**
 * Created by Shtav on 12/4/14.
 */

var app = angular.module('workoutLogApp');

app.factory('Exercise', function () {
});


app.factory('UserService', function($q, $http) {
  var service = {
    _user: null,
    setCurrentUser: function(e, s) {
      if (s && !e) {
        return service.currentUser();
      } else {
        var d = $q.defer();
        d.reject(u.error);
        return d.promise;
      }
    },
    currentUser: function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else {
        var authData = ref.getAuth();
        if (authData) {
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
          console.log("User is logged out");
        }
      }
      return d.promise;

    }
  };
  return service;
});
