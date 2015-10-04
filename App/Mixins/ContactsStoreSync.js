var ContactStore = require('../Stores/ContactStore');

module.exports = {
  getInitialState: function() {
    return {contacts: ContactStore.getState()}
  },

  updateContactFromStore: function() {
    this.setState({contacts: ContactStore.getState()});
    if (this.afterUpdateContactFromStore) {
      this.afterUpdateContactFromStore();
    }
  },

  componentDidMount: function() {
    this.updateContactFromStore();
    ContactStore.addChangeListener(this.updateContactFromStore);
  },

  componentWillUnmount: function() {
    ContactStore.removeChangeListener(this.updateContactFromStore);
  }
};