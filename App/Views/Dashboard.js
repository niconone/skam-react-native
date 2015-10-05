'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var Shared = require('../Mixins/Shared');
var Feed = require('../Mixins/Feed');

var styles = require('../Styles/Styles');

var Dashboard = React.createClass({
  mixins: [UserStoreSync, Shared, Feed],

  getInitialState: function() {
    return {
      topInset: 0,
      backgroundSource: require('image!skam-launch'),
      hide: true,
      remove: false,
      feedType: 'dashboard'
    };
  },

  handleScroll: function(e) {
    var {contentInset, contentOffset} = e.nativeEvent;

    if (contentOffset.y < -10) {
      this.setState({
        hide: false,
        topInset: 0
      });

      this.refreshFeed();
    }

    setTimeout(() => {
      this.setState({
        hide: true
      });
    }, 500);
  },

  onAddNew: function() {
    this.props.navigator.replace({
      id: 'postAdd'
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

  showRefreshActivity() {
    if (!this.state.hide) {
      return (
        <View style={[styles.refresh, this.state.hide]}>
          <ActivityIndicatorIOS style={styles.activity} />
        </View>
      )
    }
  },

  render: function() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('image!skam-dark')} style={styles.wallpaper} />
        </View>
        <View style={styles.wrapper}>
          <ScrollView style={styles.content}
            onScroll={this.handleScroll}
            scrollEventThrottle={0}
            contentOffset={{y: -this.state.topInset}}>
            {this.showFeed(true)}
            {this.showRefreshActivity()}
          </ScrollView>
          <View style={styles.toolbar}>
            <TouchableHighlight onPress={this.onAddNew}>
              <Text style={[styles.textActionShared, styles.textActionLarge]}>
                +
              </Text>
            </TouchableHighlight>
            {this.state.menuHeader}
            {this.state.menuMore}
          </View>
        </View>
      </View>
    );
  }
});

module.exports = Dashboard;
