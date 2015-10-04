'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

var styles = require('../Styles/Styles');

var Stub = React.createClass({
  render: function() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('image!skam-launch')} style={styles.wallpaper} />
        </View>
      </View>
    );
  }
});

module.exports = Stub;
