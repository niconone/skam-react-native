var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/Api');
var UserConstants = require('../Constants/User');
var merge = require('merge');

var _user = Immutable.Map();

var store = createStore({
  setState(user) {
    _user = Immutable.fromJS(user || {});
  },

  getState() {
    return _user;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case UserConstants.SIGN_IN:
        _user = Immutable.fromJS(merge(action.response, action.queryParams));
        store.emitChange(action);
        break;
      case UserConstants.PROFILE:
        _user = Immutable.fromJS(merge(action.response.user, action.queryParams));
        store.emitChange(action);
        break;
      case UserConstants.SIGN_OUT:
        _user = Immutable.Map();
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
