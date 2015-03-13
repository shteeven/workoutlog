'use strict';

/**
 * Created by Shtav on 12/4/14.
 */

var app = angular.module('workoutLogApp');


app.factory('FBUserService', function($q, FB_URI, $firebase, $firebaseAuth) {
  var ref = new Firebase(FB_URI),
    auth = $firebaseAuth(ref);

  var service = {
    _user: null,
    currentUser: function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else {
        var authData = auth.$getAuth();
        if (authData) {
          service._user = authData;
          d.resolve(service._user);
        } else {
          d.resolve(service._user);
        }
      }
      return d.promise;
    },
    logIn: function(type, user) {
      if (type === 'userName'){
        ref.authWithPassword({email: user.name, password: user.password}, function(error, authData) {
          if (error) {console.log("Login Failed!", error);}
        });
      } else if (type === 'newUser') {
        ref.createUser({email: user.name, password: user.password}, function(error, userData) {
          if (error) {console.log("Error creating user:", error);}
        })
      } else {
        auth.$authWithOAuthRedirect(type, function(error) {if (error) {console.log("Login Failed!", error);}});
      }

    },
    signOut: function(){
      ref.unauth();
    },
    authObj: function(){
      return auth;
    },
    userData: function(){
      if (service._user){
        switch (service._user.provider) {
          case 'anonymous'      : return this.loginAnonymously(options);
          case 'facebook-token' : return this.loginWithFacebookToken(options);
          case 'github'         : return this.loginWithGithub(options);
          case 'google'   : return console.log('google');
          case 'password'       : return this.loginWithPassword(options);
          case 'twitter-token'  : return this.loginWithTwitterToken(options);
        }
      }
    }
  };
  return service;
});


