var ContactStore = require('../Stores/ContactStore');

module.exports = {
  getInitialState() {
    return {contact: ContactStore.getState()}
  },

  updateUserFromStore() {
    // TODO: fix to support multiple contacts
    this.setState({contact: ContactStore.getState()});
    if (this.afterUpdateContactFromStore) {
      this.afterUpdateContactFromStore();
    }
  },

  componentDidMount() {
    this.updateContactFromStore();
    ContactsStore.addChangeListener(this.updateContactFromStore);
  },

  componentWillUnmount() {
    ContactStore.removeChangeListener(this.updateContactFromStore);
  },
};