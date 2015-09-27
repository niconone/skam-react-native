var PostStore = require('../Stores/PostStore');

module.exports = {
  getInitialState() {
    return {posts: PostStore.getState()}
  },

  updatePostFromStore() {
    this.setState({posts: PostStore.getState()});
    if (this.afterUpdatePostFromStore) {
      this.afterUpdatePostFromStore();
    }
  },

  componentDidMount() {
    this.updatePostFromStore();
    PostStore.addChangeListener(this.updatePostFromStore);
  },

  componentWillUnmount() {
    PostStore.removeChangeListener(this.updatePostFromStore);
  },
};