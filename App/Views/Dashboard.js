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
  ScrollView,
  StatusBarIOS,
  AlertIOS
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var PostStoreSync = require('../Mixins/PostStoreSync');

var styles = require('../Styles/Styles');
var mainURL = 'http://skam.club';

StatusBarIOS.setStyle('light-content', true);

var Dashboard = React.createClass({
  mixins: [UserStoreSync, PostStoreSync],

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
    this._refreshFeed();
  },

  handleScroll: function(e) {
    var {contentInset, contentOffset} = e.nativeEvent;

    if (contentOffset.y < 0) {
      this.setState({
        hide: false,
        topInset: 0
      });

      this._refreshFeed();
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

  _onPressRemove: function(idx, pid) {
    var user = UserStore.getState();

    UserActions.postDelete({
      id: user.get('id'),
      apiKey: user.get('apiKey'),
      pid: pid
    });

    var updatedPosts = this.state.posts.slice(0, idx)
      .concat(this.state.posts.slice(idx + 1));

    this.setState({
      posts: updatedPosts
    });
  },

  onShowMenu: function() {
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

  setVideo(post) {
    return "<html><body>" +
           "<iframe src=\"" + post.get('link') + "?" +
           "modestbranding=1&showinfo=0&playsinline=1\" width=\"100%\" " +
           "height=\"250\" frameborder=\"0\"></iframe></body></html>";
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
    var postList;

    if (!this.state.posts.size) {
      postList = (
        <View style={styles.postWrapper}>
          <View style={styles.container}>
            <Image source={this.state.backgroundSource} style={styles.wallpaper} />
          </View>
        </View>
      )
    } else {
      var postArr = [];
      var comment;
      var postActions;

      this.state.posts.map((postObj, idx) => {
        var post = postObj.get('value');
        postActions = (
          <View style={styles.actions} key={post.get('pid')}>
            <TouchableHighlight onPress={() => this._onPressRemove(idx, post.get('pid'))}>
              <Text style={[styles.buttonAction, styles.buttonRight]}>
                REMOVE
              </Text>
            </TouchableHighlight>
          </View>
        )

        comment = (
          <Text style={styles.comment}>
            {post.get('comment')}
          </Text>
        )

        var avatar;

        if (post.get('avatar')) {
          avatar = (
            <Image source={{uri: post.get('avatar').get('uri')}} style={styles.avatarPost} />
          )
        } else {
          avatar = (
            <Image source={require('image!skam-icon')} style={styles.avatarPost} />
          )
        }

        postArr.push(
          <View style={styles.postWrapper}>
            <View style={styles.container}>
              <Image source={{uri: post.get('backgroundSource').get('uri')}} style={styles.wallpaper} />
            </View>
            <WebView style={styles.webView}
                     html={this.setVideo(post)}
                     javaScriptEnabledAndroid={true} />
            {postActions}
            <View style={styles.postAvatarWrapper}>
              {avatar}
              <Text style={styles.username}>{post.get('name')}</Text>
            </View>
            {comment}
          </View>
        );
      });

      postList = (
        <View style={styles.content}>
          {postArr}
        </View>
      )
    }

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
            <TouchableHighlight onPress={this.onAddNew}>
              <Text style={[styles.textActionShared, styles.textActionLarge]}>
                +
              </Text>
            </TouchableHighlight>
            <Text style={styles.header}>
              SKAM
            </Text>
            <TouchableHighlight onPress={this.onShowMenu}>
              <Text style={[styles.textActionShared, styles.textActionMed]}>
                ⋯
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
});

module.exports = Dashboard;
