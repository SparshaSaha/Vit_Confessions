import React,{Component} from 'react';
import {AppRegistry,View,Text} from 'react-native';

export default class Settings extends Component{
  render(){
    return(
      <View>
      <Text>Settings</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Settings',()=>Settings);
