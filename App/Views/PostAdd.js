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
  ScrollView,
  NativeModules: {
    UIImagePickerManager
  },
  StatusBarIOS
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');

var styles = require('../Styles/Styles');

StatusBarIOS.setStyle('light-content', true);

var Add = React.createClass({
  mixins: [UserStoreSync],

  getInitialState: function() {
    return {
      backgroundSource: require('image!skam-launch')
    };
  },

  onPressSave: function() {
    var user = UserStore.getState();
    console.log('saving post');
    UserActions.postAdd({
      id: user.get('id'),
      name: user.get('name') || '?',
      avatar: user.get('avatar') || '',
      apiKey: user.get('apiKey'),
      backgroundSource: this.state.backgroundSource,
      link: this.state.youtube,
      comment: this.state.comment
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

  onBackground: function() {
    dismissKeyboard();

    var options = {
      title: 'Select Background',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      takePhotoButtonHidden: false,
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      chooseFromLibraryButtonHidden: false,
      returnBase64Image: true,
      returnIsVertical: false,
      maxWidth: 500,
      maxHeight: 800,
      quality: 0.4
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
          backgroundSource: source
        });
      } else {
        console.log('Cancel');
      }
    });
  },

  render: function() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={this.state.backgroundSource} style={styles.wallpaper} />
        </View>
        <View style={styles.form}>
          <TouchableHighlight onPress={this.onBackground}>
            <Text style={[styles.buttonShared, styles.buttonDark]}>
              Set Background Image
            </Text>
          </TouchableHighlight>
          <Text style={styles.label}>
            Youtube
          </Text>
          <TextInput style={styles.inputText}
                     onChangeText={(youtube) => this.setState({youtube})}
                     value={this.props.youtube} />
          <Text style={styles.label}>
            Comment
          </Text>
          <TextInput style={styles.inputText}
                     onChangeText={(comment) => this.setState({comment})}
                     value={this.props.comment} />
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
              Save
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Add;
