import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-native';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#F0C8CA',
    padding: 20,
    paddingTop: 30
  },
  menuItem: {
    marginBottom: 20
  },
  itemText: {
    fontFamily: 'Karla-Regular',
    fontSize: 18
  },
  logoutItemWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});

const MenuItem = ({text, onPress, ...props}) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.menuItem}
    underlayColor='#f0f4f7'>
      <Text style={styles.itemText}>{text}</Text>
  </TouchableHighlight>
);

// like MenuItem but with a wrapper to float it
// to the bottom and no bottom margin on the row
const LogoutItem = ({text, onPress, ...props}) => (
  <View style={styles.logoutItemWrapper}>
    <TouchableHighlight
      onPress={onPress}
      underlayColor='#f0f4f7'>
        <Text style={styles.itemText}>{text}</Text>
      </TouchableHighlight>
  </View>
);

export default class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      ready: false
    };
  }
  
  componentDidMount() {
    // because everything is dumb and the side menu loads quicker than the 
    // router and the items inside it, so the view we are gonna return in
    // render() will fill up the entire thing and flash unless we block it
    // for a bit...
    setTimeout(() => {
      this.setState({ready: true})
    }, 200);
  }

  render() {
    let onSelected = this.props.onItemSelected;
    
    if (!this.state.ready)
      return <View />

    return (
      <View style={styles.menu}>
        <MenuItem text={'Your Chart'} onPress={() => onSelected('You')} />
        <MenuItem text={'Best Friend #1'} onPress={() => onSelected('Saved')} />
        <MenuItem text={'Saved Charts'} onPress={() => onSelected('Saved')} />

        <LogoutItem text={'Log out'} onPress={() => onSelected('Logout')} />
      </View>
    )
  }
}