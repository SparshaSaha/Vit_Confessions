import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {Images, Colors} from '../R';
import RoundedText from '../components/RoundedText'

export default class Login extends Component{

  static navigationOptions={
    header:null
  }
  constructor(props){
    super(props);
    this.state={
      width:null
    }
  }
  componentWillMount(){
    this.setState({width:Dimensions.get('window').width});
  }
  render(){
    const widthStyle = {width:this.state.width*0.85};
    const dynamicStyle =  StyleSheet.flatten([widthStyle,styles.inputView]);
    return(
      <View style={styles.container}>
        <Image source={Images.logo} style={{width:100,height:100}} />
        <Text style={styles.title}>Confez</Text>
        <RoundedText placeholder='Username' style={dynamicStyle} inputTextStyle={styles.inputTextStyle}/>
        <RoundedText placeholder='Password' secureTextEntry={true} style={dynamicStyle} inputTextStyle={styles.inputTextStyle}/>
        <RkButton rkType='rounded'
          style={{backgroundColor:Colors.primary,width:this.state.width*0.75, marginVertical:20}}>
            Login
        </RkButton>
        <TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <Text>Don't Have an Account? </Text>
          <Text style={{fontWeight:'bold'}}> Signup</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:20
  },
  title :{
   fontSize : 35,
   fontFamily : 'IndieFlower',
   color : 'black',
   marginVertical:10
 },
 inputView:{
   margin:5,
   paddingHorizontal:10
 },
 inputTextStyle:{
   fontSize:16,
   color:'black'
 }
});

AppRegistry.registerComponent('Login',()=>Login);
