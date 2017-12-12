import React,{Component} from 'react';
import {AppRegistry, View, TextInput, StyleSheet} from 'react-native';


export default class RoundedText extends Component {

  render(){
    const defaultStyle = {borderWidth:1,borderStyle:'solid',borderRadius:25, borderColor:'grey'};
    const custom =  this.props.style;
    const combined = StyleSheet.flatten([defaultStyle,custom]);
    return(
      <View style={combined}>
        <TextInput underlineColorAndroid='transparent'
        placeholder={this.props.placeholder}
        style={this.props.inputTextStyle}
        secureTextEntry={this.props.secureTextEntry}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('RoundedText',()=>RoundedText);
