var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/Api');
var PostConstants = require('../Constants/Post');
var merge = require('merge');

var _posts = Immutable.Map();

var store = createStore({
  setState(posts) {
    _posts = Immutable.fromJS(posts || {});
  },

  getState() {
    return _posts;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case PostConstants.ADD:
        _posts = _posts.push(Immutable.fromJS(action.response));
        store.emitChange(action);
        break;
      case PostConstants.FEED:
        _posts = Immutable.fromJS(action.response.posts);
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
