var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/Api');
var ContactConstants = require('../Constants/Contact');
var merge = require('merge');

var _contacts = Immutable.Map();

var store = createStore({
  setState(contacts) {
    _contacts = Immutable.fromJS(contacts || {});
  },

  getState() {
    return _contacts;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case ContactConstants.ADD:

        store.emitChange(action);
        break;
      case ContactConstants.NETWORK:
        _contacts = Immutable.fromJS(action.response);
        store.emitChange(action);
        break;
      case ContactConstants.VOUCH:
        //_contacts = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.UNVOUCH:
        //_contacts = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.REMOVE:
        //_contacts = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.BAN:
        //_contacts = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.UNBAN:
        //_contacts = Immutable.Map();
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
