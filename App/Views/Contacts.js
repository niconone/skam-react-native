'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView
} = React;

var UserStore = require('../Stores/UserStore');
var UserStoreSync = require('../Mixins/UserStoreSync');
var UserActions = require('../Actions/UserActions');
var Shared = require('../Mixins/Shared');
var ContactStoreSync = require('../Mixins/ContactsStoreSync');
var Feed = require('../Mixins/Feed');

var styles = require('../Styles/Styles');

var Dashboard = React.createClass({
  mixins: [UserStoreSync, Shared, Feed, ContactStoreSync],

  getInitialState: function() {
    return {
      topInset: 0,
      backgroundSource: require('image!skam-launch'),
      hide: true,
      currentContact: false
    };
  },

  handleScroll: function(e) {
    var {contentInset, contentOffset} = e.nativeEvent;

    if (contentOffset.y < -10) {
      this.setState({
        hide: false,
        topInset: 0
      });

      this.refreshContacts();
    }

    setTimeout(() => {
      this.setState({
        hide: true
      });
    }, 500);
  },

  onFeed() {
    setImmediate(() => {
      this.props.navigator.replace({
        id: 'userFeed',
        cid: this.state.cid
      });
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

  refreshContacts() {
    var user = UserStore.getState();

    UserActions.trustedNetwork({
      id: user.get('id'),
      apiKey: user.get('apiKey')
    });
  },

  showContacts() {
    if (!this.state.contacts || (this.state.contacts && !this.state.contacts.size)) {
      return (
        <View style={styles.postWrapper}>
          <View style={styles.container}>
            <Image source={this.state.backgroundSource} style={styles.wallpaper} />
          </View>
        </View>
      );
    } else {
      var contactArr = [];

      this.state.contacts.map((contact) => {
        var avatar;

        if (contact.get('avatar') && contact.get('avatar').get('uri')) {
          avatar = (
            <Image source={{uri: contact.get('avatar').get('uri')}} style={styles.avatarPost} />
          )
        } else {
          avatar = (
            <Image source={require('image!skam-icon')} style={styles.avatarPost} />
          )
        }

        contactArr.push(
          <View key={contact.get('id')}>
            <TouchableHighlight onPress={() => {
              this.setState({
                cid: contact.get('id')
              });
              this.onFeed();
            }}>
              <View style={[styles.postAvatarWrapper, styles.listing]}>
                {avatar}
                <Text style={[styles.username, styles.usernameDark]}>{contact.get('name') || '?'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      });

      return (
        <View style={styles.content}>
          {contactArr}
        </View>
      );
    }
  },

  componentWillMount: function() {
    this.refreshContacts();
  },

  render: function() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('image!skam-launch')} style={styles.wallpaper} />
        </View>
        <View style={styles.wrapper}>
          <ScrollView style={[styles.content, styles.contacts]}
            onScroll={this.handleScroll}
            scrollEventThrottle={0}
            contentOffset={{y: -this.state.topInset}}>
            {this.showContacts()}
            {this.showRefreshActivity()}
          </ScrollView>
          <View style={styles.toolbar}>
            {this.state.menuCancelMenu}
            {this.state.menuHeader}
            {this.state.menuEmpty}
          </View>
        </View>
      </View>
    );
  }
});

module.exports = Dashboard;
