var UserStore = require('../Stores/UserStore');

module.exports = {
  getInitialState: function() {
    return {user: UserStore.getState()}
  },

  updateUserFromStore: function() {
    this.setState({user: UserStore.getState()});
    if (this.afterUpdateUserFromStore) {
      this.afterUpdateUserFromStore();
    }
  },

  componentDidMount: function() {
    this.updateUserFromStore();
    UserStore.addChangeListener(this.updateUserFromStore);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.updateUserFromStore);
  }
};