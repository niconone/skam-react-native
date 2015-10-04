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
  WebView,
  ScrollView
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var PostStoreSync = require('../Mixins/PostStoreSync');
var Shared = require('../Mixins/Shared');

var styles = require('../Styles/Styles');

var Dashboard = React.createClass({
  mixins: [UserStoreSync, PostStoreSync, Shared],

  _refreshFeed: function() {
    var user = UserStore.getState();

    UserActions.postFeed({
      uid: user.get('id')
    });
  },

  getInitialState: function() {
    return {
      topInset: 0,
      backgroundSource: require('image!skam-launch'),
      hide: true,
      remove: false
    };
  },

  componentWillMount: function() {
    this.refreshContacts();
  },

  handleScroll: function(e) {
    var {contentInset, contentOffset} = e.nativeEvent;

    if (contentOffset.y < 0) {
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
            scrollEventThrottle={1}
            contentOffset={{y: -this.state.topInset}}>
            {postList}
            {this.showRefreshActivity()}
          </ScrollView>
          <View style={styles.toolbar}>
            {this.state.menuCancelMenu}
            {this.state.menuHeader}
            {this.state.menuMore}
          </View>
        </View>
      </View>
    );
  }
});

module.exports = Dashboard;
