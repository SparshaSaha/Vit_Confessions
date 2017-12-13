import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {Images, Colors} from '../R';
import RoundedText from '../components/RoundedText'
import SocketIOClient from 'socket.io-client';

export default class Login extends Component{
  static navigationOptions={
    header:null
  }
  constructor(props){
    super(props);
    this.state={
      width:null,
      height:null,
      regNo:'',
      password:''
    }
  }
  componentWillMount(){
    var window= Dimensions.get('window');
    this.setState({width:window.width,height:window.height});
  }
  onLoginPress=()=>{
    this.socket = SocketIOClient('https://vitconfession.herokuapp.com/');
    this.socket.on('connect',(socket)=>{
      console.log("Conncted");
      this.socket.on('signin_reply',(data)=>{
        console.log(data);
      });
      this.socket.emit("signin",{email:'saha.sparsha@gmail.com',password:'9790722134'});
    });
    console.log(this.state.regNo);
  }
  render(){
    const widthStyle = {width:this.state.width*0.85};
    const dynamicStyle =  StyleSheet.flatten([widthStyle,styles.inputView]);
    /*<Image source={Images.background} style={StyleSheet.flatten([styles.backgroundImage,{width:this.state.width,height:this.state.height}])} blurRadius={1.2}/>*/
    return(
      <View style={styles.container}>
      <Image source={Images.logo} style={{width:100,height:100}} />
        <Text style={styles.title}>Confez</Text>
        <RoundedText imgSource ={Images.username}placeholder='Username' style={dynamicStyle} inputTextStyle={styles.inputTextStyle} onChangeText={(regNo)=>{this.setState({regNo})}} />
        <RoundedText imgSource = {Images.pass} placeholder='********' secureTextEntry={true} style={dynamicStyle} inputTextStyle={styles.inputTextStyle} onChangeText={(password)=>{this.setState({password})}}/>
        <RkButton rkType='rounded' onPress={this.onLoginPress}
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom :0,
    right : 0,
    resizeMode: 'cover'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:20,
  },
  title :{
   fontSize : 35,
   fontFamily : 'IndieFlower',
   color : 'black'
  },
  welcome :{
   fontSize : 45,
   color : 'white',
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
