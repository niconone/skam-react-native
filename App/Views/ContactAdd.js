'use strict';

var React = require('react-native');
var Image = React.Image;
var dismissKeyboard = require('dismissKeyboard');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  AlertIOS
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');

var styles = require('../Styles/Styles');

var Add = React.createClass({
  mixins: [UserStoreSync],

  onPressSave: function() {
    var user = UserStore.getState();
    console.log('saving contact');
    if (!this.state.phone || !this.state.phone.match(/^[0-9\+]/)) {
      AlertIOS.alert(
        'Invalid number',
        'Number cannot be empty'
      );
    } else {
      UserActions.contactAdd({
        id: user.get('id'),
        name: user.get('name') || '?',
        avatar: user.get('avatar') || '',
        apiKey: user.get('apiKey'),
        number: this.state.phone
      });

      this.props.navigator.replace({
        id: 'dashboard'
      });
    }
  },

  onPressCancel: function() {
    this.props.navigator.replace({
      id: 'menu'
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
          <Text style={styles.label}>
            Enter phone number
          </Text>
          <TextInput keyboardType='phone-pad'
                     style={styles.inputText}
                     onChangeText={(phone) => this.setState({phone})}
                     value={this.props.phone} />
        </View>
        <View style={styles.toolbar}>
          <TouchableHighlight onPress={this.onPressCancel}>
            <Text style={[styles.textActionShared, styles.textAction]}>
              Cancel
            </Text>
          </TouchableHighlight>
          <Text style={styles.header}>
            SKAM
          </Text>
          <TouchableHighlight onPress={this.onPressSave}>
            <Text style={[styles.textActionShared, styles.textActionRight]}>
              Add
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Add;
