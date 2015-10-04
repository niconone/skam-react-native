var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  WebView,
  TouchableHighlight,
} = React;

var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var PostStoreSync = require('../Mixins/PostStoreSync');

var styles = require('../Styles/Styles');

module.exports = {
  mixins: [PostStoreSync],

  refreshFeed: function() {
    var user = UserStore.getState();

    UserActions.postFeed({
      uid: user.get('id')
    });
  },

  componentWillMount: function() {
    this.refreshFeed();
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

  _setVideo: function(post) {
    return "<html><body>" +
           "<iframe src=\"" + post.get('link') + "?" +
           "modestbranding=1&showinfo=0&playsinline=1\" width=\"100%\" " +
           "height=\"250\" frameborder=\"0\"></iframe></body></html>";
  },

  showFeed: function(owner) {
    if (!this.state.posts || (this.state.posts && !this.state.posts.size)) {
      return (
        <View style={styles.postWrapper}>
          <View style={styles.container}>
            <Image source={this.state.backgroundSource} style={styles.wallpaper} />
          </View>
        </View>
      );
    } else {
      var postArr = [];
      var comment;
      var postActions;

      this.state.posts.map((postObj, idx) => {
        var post = postObj.get('value');
        var actions;

        if (owner) {
          postActions = (
            <View style={styles.actions} key={post.get('pid')}>
              <TouchableHighlight onPress={() => this._onPressRemove(idx, post.get('pid'))}>
                <Text style={[styles.buttonAction, styles.buttonRight]}>
                  REMOVE
                </Text>
              </TouchableHighlight>
            </View>
          )
        }

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
                     html={this._setVideo(post)}
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

      return (
        <View style={styles.content}>
          {postArr}
        </View>
      );
    }
  }
};
