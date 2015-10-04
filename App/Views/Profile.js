'use strict';

var React = require('react-native');
var Image = React.Image;
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  NativeModules: {
    UIImagePickerManager
  }
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');

var styles = require('../Styles/Styles');

var Profile = React.createClass({
  mixins: [UserStoreSync],

  getInitialState: function() {
    var user = UserStore.getState();

    return {
      avatar: user.get('avatar'),
      name: user.get('name')
    };
  },

  onPressSave: function() {
    var user = UserStore.getState();

    UserActions.profileUpdate({
      id: user.get('id'),
      apiKey: user.get('apiKey'),
      name: this.state.name,
      avatar: this.state.avatar
    });

    this.props.navigator.replace({
      id: 'dashboard'
    });
  },

  onPressCancel: function() {
    this.props.navigator.replace({
      id: 'dashboard'
    });
  },

  onAvatar: function() {
    var options = {
      title: 'Select Avatar',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      takePhotoButtonHidden: false,
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      chooseFromLibraryButtonHidden: false,
      returnBase64Image: true,
      returnIsVertical: false,
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.3
    };

    UIImagePickerManager.showImagePicker(options, (type, response) => {
      if (type !== 'cancel') {
        var source;

        if (type === 'data') {
          source = {
            uri: 'data:image/jpeg;base64,' + response,
            isStatic: true
          };
        }

        this.setState({
          avatar: source
        });
      } else {
        console.log('Cancel');
      }
    });
  },

  render: function() {
    var avatar;

    if (this.state.avatar.uri || this.state.avatar.get('uri')) {
      avatar = (
        <Image source={{uri: this.state.avatar.uri || this.state.avatar.get('uri')}} style={styles.avatar} />
      )
    } else {
      avatar = (
        <Image source={require('image!skam-icon')} style={styles.avatar} />
      )
    }

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('image!skam-launch')} style={styles.wallpaper} />
        </View>
        <View style={styles.form}>
          <View style={styles.avatarWrapper}>
            {avatar}
          </View>
          <TouchableHighlight onPress={this.onAvatar}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Set Avatar
            </Text>
          </TouchableHighlight>
          <Text style={styles.label}>
            Name
          </Text>
          <TextInput style={styles.inputText}
                     onChangeText={(name) => this.setState({name})}
                     value={this.state.name} />
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
              Update
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Profile;
