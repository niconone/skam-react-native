var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/Api');
var UserConstants = require('../Constants/User');
var UserStore = require('../Stores/UserStore');

var React = require('react-native');
var {
  AsyncStorage
} = React;

var PREFIX = '@Skam:';
var USER_KEY = PREFIX + 'user';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(USER_KEY, (error, user) => {
      if (error) {
        console.log('Error getting user from local storage! ' + error.message);
        complete();
      } else {
        UserStore.setState(JSON.parse(user));
        complete();
      }
    });
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;
    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case UserConstants.SIGN_IN:
        AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
          if (error) {
            console.log('Error setting user in local storage! ' + error.message);
          } else {
            store.emitChange(action);
          }
        })
        break;
      case UserConstants.PROFILE:
        AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
          if (error) {
            console.log('Error setting user in local storage! ' + error.message);
          } else {
            store.emitChange(action);
          }
        })
        break;
      case UserConstants.SIGN_OUT:
        AsyncStorage.removeItem(USER_KEY, (error) => {
          if (error) {
            console.log('Error clearing session! ' + error.message);
          } else {
            store.emitChange(action);
          }
        });
    }

    return true;
  })
})

module.exports = store;