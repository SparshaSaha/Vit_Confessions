import React,{Component} from 'react';
import {AppRegistry,View,Text,StyleSheet} from 'react-native'

export default class Chats extends Component{


  render(){
    return(
      <View>
      <Text>Sent</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Sent',()=>Sent);
