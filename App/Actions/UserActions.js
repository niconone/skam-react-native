var React = require('react-native');
var {
  AlertIOS,
} = React;

var dispatcher = require('../AppDispatcher');
var UserStore = require('../Stores/UserStore');
var UserConstants = require('../Constants/User');
var ContactConstants = require('../Constants/Contact');
var PostStore = require('../Stores/PostStore');
var PostConstants = require('../Constants/Post');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/Api');

var mainURL = 'http://skam.club';

var postData = function(params) {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
};

var getData = function() {
  return {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

module.exports = {
  newSession(params) {
    var url = mainURL + '/authenticate';

    fetch(url, postData(params))
      .then(handleResponse(UserConstants.SIGN_IN, params));
  },

  verifyPin(params) {
    var url = mainURL + '/verify';

    dispatch(UserConstants.SIGN_IN, ApiConstants.PENDING, params);

    fetch(url, postData(params))
      .then(handleResponse(UserConstants.SIGN_IN, params))
      .catch(err => {
        AlertIOS.alert(
          'Invalid PIN',
          'The PIN did not match the one on the server'
        );
      });
  },

  profileUpdate(params) {
    var url = mainURL + '/profile';

    dispatch(UserConstants.PROFILE, ApiConstants.PENDING, params);

    fetch(url, postData(params))
      .then(handleResponse(UserConstants.PROFILE, params))
      .catch(err => {
        AlertIOS.alert(
          'Profile error',
          'Could not update profile'
        );
      });
  },

  contactAdd(params) {
    var url = mainURL + '/contact/add';

    dispatch(ContactConstants.ADD, ApiConstants.PENDING, params);
    console.log('adding contact ', params)
    fetch(url, postData(params))
      .then(handleResponse(ContactConstants.ADD, params))
      .catch(err => {
        AlertIOS.alert(
          'Contact error',
          'Could not add contact'
        );
      });
  },

  postFeed(params) {
    var url = mainURL + '/feed/' + params.uid;

    dispatch(PostConstants.FEED, ApiConstants.PENDING, params);

    fetch(url, getData())
      .then(handleResponse(PostConstants.FEED))
      .catch(err => {
        AlertIOS.alert(
          'Server error',
          'The feed could not be retrieved'
        );
      });
  },

  postAdd(params) {
    var url = mainURL + '/post/add';

    dispatch(PostConstants.ADD, ApiConstants.PENDING, params);

    fetch(url, postData(params))
      .then(handleResponse(PostConstants.ADD, params))
      .catch(err => {
        console.log(err);
      });
  },

  postDelete(params) {
    var url = mainURL + '/post/delete';

    fetch(url, postData(params))
      .catch(err => {
        AlertIOS.alert(
          'Post error',
          'The post could not be removed'
        );
      });
  },

  signOut() {
    dispatcher.handleViewAction({
      actionType: UserConstants.SIGN_OUT,
    });
  }
}
