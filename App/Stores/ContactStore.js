var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/Api');
var ContactConstants = require('../Constants/Contact');
var merge = require('merge');

var _contact = Immutable.Map();

var store = createStore({
  setState(contact) {
    _contact = Immutable.fromJS(contact || {});
  },

  getState() {
    return _contact;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case ContactConstants.ADD:
        _contact = Immutable.fromJS(merge(action.response, action.queryParams));
        store.emitChange(action);
        break;
      case ContactConstants.VOUCH:
        _contact = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.UNVOUCH:
        _contact = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.REMOVE:
        _contact = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.BAN:
        _contact = Immutable.Map();
        store.emitChange(action);
        break;
      case ContactConstants.UNBAN:
        _contact = Immutable.Map();
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
