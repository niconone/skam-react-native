'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var Shared = require('../Mixins/Shared');

var styles = require('../Styles/Styles');

var Menu = React.createClass({
  mixins: [UserStoreSync, Shared],

  onAddUser: function() {
    this.props.navigator.replace({
      id: 'contactAdd'
    });
  },

  onNetwork: function() {
    this.props.navigator.replace({
      id: 'network'
    });
  },

  onTrustedNetwork: function() {
    this.props.navigator.replace({
      id: 'contacts'
    });
  },

  onProfile: function() {
    this.props.navigator.replace({
      id: 'profileUpdate'
    });
  },

  onSignout: function() {
    UserActions.signOut();

    this.props.navigator.replace({
      id: 'authenticate'
    });
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (!user.get('id')) {
      this.props.navigator.replace({
        id: 'authenticate'
      });
    }
  },

  render: function() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('image!skam-launch')} style={styles.wallpaper} />
        </View>
        <View style={styles.form}>
          <TouchableHighlight onPress={this.onProfile}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Update Profile
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onAddUser}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Add User
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onTrustedNetwork}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Trusted Network
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onNetwork}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Recommended Network
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onSignout}>
            <Text style={[styles.buttonShared, styles.buttonWarn]}>
              Sign out
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.toolbar}>
          {this.state.menuCancelDashboard}
          {this.state.menuHeader}
          {this.state.menuEmpty}
        </View>
      </View>
    );
  }
});

module.exports = Menu;
