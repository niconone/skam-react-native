'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} = React;

var UserActions = require('../Actions/UserActions');
var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');

var styles = require('../Styles/Styles');

var Login = React.createClass({
  mixins: [UserStoreSync],

  onPress: function() {
    if (!this.state.text || !this.state.text.match(/^[0-9\+]/)) {
      AlertIOS.alert(
        'Invalid number',
        'Number cannot be empty'
      );
    } else {
      UserActions.newSession({
        phone: this.state.text
      });

      this.props.navigator.replace({
        id: 'verifyPin'
      });
    }
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (user.get('id')) {
      this.props.navigator.replace({
        id: 'dashboard'
      });
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
            Sign in with your phone number
          </Text>
          <TextInput keyboardType='phone-pad'
                     style={styles.inputText}
                     onChangeText={(text) => this.setState({text})}
                     value={this.props.text} />
          <TouchableHighlight onPress={this.onPress}>
            <Text style={[styles.buttonShared, styles.button]}>
              Get PIN
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Login;
