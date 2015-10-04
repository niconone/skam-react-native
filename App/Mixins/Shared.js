var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var styles = require('../Styles/Styles');

module.exports = {
  getInitialState() {
    return {
      menuHeader: (
        <Text style={styles.header}>
          SKAM
        </Text>
      ),

      menuCancelMenu: (
        <TouchableHighlight onPress={this.onPressCancelMenu}>
          <Text style={[styles.textActionShared, styles.textAction]}>
            Cancel
          </Text>
        </TouchableHighlight>
      ),

      menuCancelDashboard: (
        <TouchableHighlight onPress={this.onPressCancelDashboard}>
          <Text style={[styles.textActionShared, styles.textAction]}>
            Cancel
          </Text>
        </TouchableHighlight>
      ),

      menuMore: (
        <TouchableHighlight onPress={this.onShowMenu}>
          <Text style={[styles.textActionShared, styles.textActionMed]}>
            ⋯
          </Text>
        </TouchableHighlight>
      )
    }
  },

  onPressCancelMenu() {
    this.props.navigator.replace({
      id: 'menu'
    });
  },

  onPressCancelDashboard() {
    this.props.navigator.replace({
      id: 'dashboard'
    });
  },

  onShowMenu() {
    this.props.navigator.replace({
      id: 'menu'
    });
  }
};