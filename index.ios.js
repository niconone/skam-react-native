'use strict';

var React = require('react-native');
var Image = React.Image;
var {
  AppRegistry,
  Navigator,
  StatusBarIOS,
} = React;

var UserLocalStorage = require('./App/Stores/UserLocalStorage');
var Login = require('./App/Views/Login');
var VerifyPin = require('./App/Views/VerifyPin');
var Stub = require('./App/Views/Stub');
var Dashboard = require('./App/Views/Dashboard');
var PostAdd = require('./App/Views/PostAdd');
var Menu = require('./App/Views/Menu');
var Profile = require('./App/Views/Profile');
var ContactAdd = require('./App/Views/ContactAdd');
var Contacts = require('./App/Views/Contacts');
var Network = require('./App/Views/Network');
var UserFeed = require('./App/Views/UserFeed');

StatusBarIOS.setStyle('light-content', true);

var skam = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    UserLocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'authenticate':
        return <Login navigator={nav} />;
      case 'verifyPin':
        return <VerifyPin navigator={nav} />;
      case 'dashboard':
        return <Dashboard navigator={nav} />;
      case 'postAdd':
        return <PostAdd navigator={nav} />;
      case 'profileUpdate':
        return <Profile navigator={nav} />;
      case 'contactAdd':
        return <ContactAdd navigator={nav} />;
      case 'contacts':
        return <Contacts navigator={nav} />;
      case 'network':
        return <Network navigator={nav} />;
      case 'userFeed':
        return <UserFeed navigator={nav} cid={route.cid} />;
      case 'menu':
        return <Menu navigator={nav} />;
      default:
        return <Stub />;
    }
  },

  render() {
    if (!this.state.bootstrapped) {
      return <Stub />
    }

    return (
      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
});

AppRegistry.registerComponent('skam', () => skam);
