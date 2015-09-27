'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StatusBarIOS
} = React;

var dispatcher = require('../AppDispatcher');
var UserConstants = require('../Constants/User');
var UserActions = require('../Actions/UserActions');
var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');

var styles = require('../Styles/Styles');

StatusBarIOS.setStyle('light-content', true);

var VerifyPin = React.createClass({
  mixins: [UserStoreSync],

  onPress: function() {
    var user = UserStore.getState();

    UserActions.verifyPin({
      pin: this.state.text,
      phone: user.get('phone')
    });
  },

  onAuthenticate: function() {
    this.props.navigator.replace({id: 'authenticate'});
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (user.get('id')) {
      this.props.navigator.replace({id: 'dashboard'});
    }
  },

  render: function() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('image!skam-launch')} style={styles.wallpaper} />
        </View>
        <View style={styles.toolbar}>
          <Text style={styles.header}>
            SKAM
          </Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>
            Enter the PIN you received on your phone
          </Text>
          <TextInput keyboardType='number-pad' style={styles.inputText}
                     onChangeText={(text) => this.setState({text})}
                     value={this.props.text} />
          <TouchableHighlight onPress={this.onPress}>
            <Text style={[styles.buttonShared, styles.button]}>
              Verify
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onAuthenticate}>
            <Text style={[styles.buttonShared, styles.button]}>
              Enter number again
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = VerifyPin;
