import React,{Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';


export default class Feeds extends Component{
  render(){
    return(
      <View>
      <Text>Feeds</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Feeds',()=>Feed);
