import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';
import {Images, Colors,Strings} from '../R';
import RoundedText from '../components/RoundedText'
import {socket} from '../utils/socket'

export default class Login extends Component{
  static navigationOptions={
    header:null
  }
  constructor(props){
    super(props);
    this.state={
      width:null,
      height:null,
      email:'saha.sparsha@gmail.com',
      password:'9790722134'
    }
  }
  componentWillMount(){
    var window= Dimensions.get('window');
    this.setState({width:window.width,height:window.height});
  }
  onLoginPress=()=>{
    socket.beginReceivingFor("signin_reply",(result)=>{
      console.log(result);
    },()=>{
      socket.send("signin",{email:this.state.email,password:this.state.password})
    });
  }
  onSignUpPress=()=>{
    const {navigate}= this.props.navigation;
    navigate('Signup',{});
  }
  render(){
    const widthStyle = {width:this.state.width*0.85};
    const dynamicStyle =  StyleSheet.flatten([widthStyle,styles.inputView]);
    /*<Image source={Images.background} style={StyleSheet.flatten([styles.backgroundImage,{width:this.state.width,height:this.state.height}])} blurRadius={1.2}/>*/
    return(
      <View style={styles.container}>
      <Image source={Images.logo} style={{width:100,height:100}} />
        <Text style={styles.title}>Confez</Text>

        <RoundedText imgSource ={Images.username}
        placeholder='Username'
        style={dynamicStyle}
        inputTextStyle={styles.inputTextStyle}
        onChangeText={(regNo)=>{this.setState({email})}}
        imageStyle = {styles.image} >
          saha.sparsha@gmail.com
        </RoundedText>

        <RoundedText imgSource = {Images.pass}
        placeholder='********' secureTextEntry={true}
        style={dynamicStyle} inputTextStyle={styles.inputTextStyle}
        onChangeText={(password)=>{this.setState({password})}}
        imageStyle = {styles.image}>
          9790722134
        </RoundedText>

        <RkButton rkType='rounded' onPress={this.onLoginPress}
          style={{backgroundColor:Colors.primary,width:'75%', marginVertical:20}}>
            Login
        </RkButton>
        <TouchableOpacity onPress={this.onSignUpPress}>
        <View style={{flexDirection:'row'}}>
          <Text>Don't Have an account? </Text>
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
    backgroundColor:'white'
  },
  title :{
   fontSize : 35,
   fontFamily : 'IndieFlower',
   color : 'black'
  },
 inputView:{
   margin:5,
   paddingHorizontal:10,
   paddingVertical : 6,
 },
 inputTextStyle:{
   fontSize:16,
   color:'black',
 },
 image:{
   width : 25,
   height :25,
 }
});

AppRegistry.registerComponent('Login',()=>Login);
