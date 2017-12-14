import React,{Component} from 'react';
import {AppRegistry, View, TextInput, StyleSheet, Image} from 'react-native';
import {Colors} from '../R'

export default class RoundedText extends Component {

  render(){
    const custom =  this.props.style;
    const combined = StyleSheet.flatten([styles.viewDefaultStyle,custom]);
    return(
      <View style={combined}>
        <Image source={this.props.imgSource} style={styles.image}/>
        <TextInput underlineColorAndroid='transparent'
        placeholder={this.props.placeholder}
        style={StyleSheet.flatten([this.props.inputTextStyle,{flex:1,marginTop:6}])}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={this.props.onChangeText}>{this.props.children}</TextInput>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  viewDefaultStyle : {
    borderWidth:1,
    borderStyle:'solid',
    borderRadius:25,
    borderColor:Colors.primary,
    flexDirection:'row',
  },
  image:{
    width : 25,
    height :25,
    alignSelf:'center'
  }
});

AppRegistry.registerComponent('RoundedText',()=>RoundedText);
