var PostStore = require('../Stores/PostStore');

module.exports = {
  getInitialState: function() {
    return {posts: PostStore.getState()}
  },

  updatePostFromStore: function() {
    this.setState({posts: PostStore.getState()});
    if (this.afterUpdatePostFromStore) {
      this.afterUpdatePostFromStore();
    }
  },

  componentDidMount: function() {
    this.updatePostFromStore();
    PostStore.addChangeListener(this.updatePostFromStore);
  },

  componentWillUnmount: function() {
    PostStore.removeChangeListener(this.updatePostFromStore);
  }
};