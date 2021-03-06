'use strict';

var React = require('react-native');
var StyleSheet= React.StyleSheet;

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wallpaper: {
    flex: 1,
    resizeMode: 'stretch',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 255, 156, 0.1)',
    shadowColor: '#111',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 2
    },
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 30,
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    fontSize: 20,
    color: '#0fff9c',
    textAlign: 'center',
    fontWeight: '200',
  },
  refresh: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  activity: {
    flex: 1,
  },
  label: {
    flex: 1,
    fontSize: 25,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#bbb',
    textAlign: 'center',
    fontWeight: '300',
    paddingTop: 30,
  },
  buttonShared: {
    flex: 1,
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '200',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 3,
  },
  buttonDark: {
    backgroundColor: 'rgba(50, 179, 159, 0.5)',
    marginTop: 2,
  },
  buttonWarn: {
    backgroundColor: 'rgba(255, 15, 55, 0.7)',
    marginTop: 70,
  },
  actions: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    height: 30,
    borderTopWidth: 5,
    borderTopColor: 'rgba(15, 255, 156, 0.9)',
  },
  buttonAction: {
    fontSize: 15,
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    fontWeight: '200',
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    top: 0,
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    right: 0,
  },
  textActionShared: {
    flex: 1,
    color: '#fff',
    fontWeight: '100',
    paddingLeft: 10,
  },
  textActionLarge: {
    fontSize: 60,
    textAlign: 'left',
    width: 50,
    marginBottom: -12,
    paddingRight: 10,
    marginTop: -30,
  },
  textActionMed: {
    fontSize: 35,
    textAlign: 'right',
    width: 50,
    marginBottom: -12,
    paddingRight: 20,
    marginTop: -5,
  },
  textAction: {
    fontSize: 20,
    fontWeight: '400',
    paddingRight: 10,
    width: 90,
    height: 30,
  },
  textActionRight: {
    fontSize: 20,
    fontWeight: '400',
    paddingRight: 10,
    width: 90,
    height: 30,
    textAlign: 'right',
  },
  inputText: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    fontSize: 30,
    borderWidth: 0.5,
    borderRadius: 3,
  },
  form: {
    backgroundColor: 'rgba(1, 1, 1, 0.3)',
    paddingTop: 80,
  },
  postWrapper: {
    flex: 1,
    marginTop: -20,
    paddingTop: 150,
    marginBottom: -150,
    height: 840,
    position: 'relative',
  },
  webView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: -10,
    right: -10,
    top: 0,
    bottom: 0,
  },
  comment: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    height: 140,
    backgroundColor: 'rgba(1, 1, 1, 0.6)',
    color: '#fff',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
    width: 100,
    height: 100,
  },
  postAvatarWrapper: {
    flexDirection: 'row',
  },
  listing: {
    marginBottom: 2,
  },
  avatarPost: {
    width: 80,
    height: 80,
  },
  username: {
    color: '#111',
    fontSize: 25,
    backgroundColor: 'rgba(15, 255, 156, 0.5)',
    flex: 1,
    paddingLeft: 20,
    paddingTop: 25,
  },
  usernameDark: {
    color: '#fff',
    backgroundColor: 'rgba(1, 1, 1, 0.3)',
  },
  contacts: {
    marginTop: 60,
  }
});

module.exports = styles;
