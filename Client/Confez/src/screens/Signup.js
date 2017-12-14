import React,{Component} from 'react';
import {AppRegistry,StyleSheet,Text,View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';
import {socket} from '../utils/socket.js';
import RoundedText from '../components/RoundedText';
import * as R from '../R';

export default class Signup extends Component {

  constructor(props){
    super(props);
    this.state ={
      name : 'SsdcID',
      reg_no : '15BsdfsdCEXYYZ',
      email : 'srisdfdhadvsvrswain25@gmail.com',
      password : '123312',
      username : "SPARSasdHS12314",
      width : null
    }
  }

  static navigationOptions ={
    header : null
  };

  componentWillMount(){
    var window= Dimensions.get('window');
    this.setState({width:window.width,height:window.height});
  }

  onSignUpPress=()=>{
    let data = {
      email:this.state.email,
      password:this.state.password,
      reg_no:this.state.reg_no,
      username:this.state.username,
      name:this.state.name,
      photo_link:'null'
    };

    socket.beginReceivingFor('signup_reply',(result)=>{
      console.log(result);
    },()=>{
      socket.send('signup',data);
    });
  }

  render(){
    const widthStyle = {width:this.state.width*0.85};
    const dynamicStyle =  StyleSheet.flatten([widthStyle,styles.inputView]);
    return(
        <View style={styles.container}>
          <Image source={R.Images.logo} style={{width:100,height:100}}/>
          <Text style={styles.title}>Confez</Text>

          <RoundedText imgSource ={Images.username}
          placeholder='Name'
          style={dynamicStyle}
          inputTextStyle={styles.inputTextStyle}
          onChangeText={(name)=>{this.setState({name})}} >
            Sridhar Swain
          </RoundedText>

          <RoundedText imgSource ={Images.finger}
          placeholder='Registration No.'
          style={dynamicStyle}
          inputTextStyle={styles.inputTextStyle}
          onChangeText={(regNo)=>{this.setState({regNo})}} >
            15BCE1203
          </RoundedText>

          <RoundedText imgSource ={Images.mail}
          placeholder='Email'
          style={dynamicStyle}
          inputTextStyle={styles.inputTextStyle}
          onChangeText={(email)=>{this.setState({email})}} >
            sridharswain25@hotmail.com
          </RoundedText>

          <RoundedText imgSource = {Images.pass}
          placeholder='********' secureTextEntry={true}
          style={dynamicStyle} inputTextStyle={styles.inputTextStyle}
          onChangeText={(password)=>{this.setState({password})}}>
            9790700912
          </RoundedText>

          <RkButton rkType='rounded' onPress={this.onSignUpPress}
            style={{backgroundColor:Colors.primary,width:this.state.width*0.75, marginVertical:20}}>
              Signup
          </RkButton>

          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <View style={{flexDirection:'row'}}>
              <Text>Already have an account? </Text>
              <Text style={{fontWeight:'bold'}}> Login</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems :'center',
    paddingHorizontal : 10,
    flex :2
  },
  inputView:{
    margin:5,
    paddingHorizontal:10
  },
  inputTextStyle:{
    fontSize:16,
    color:'black'
  },
  title :{
   fontSize : 35,
   fontFamily : 'IndieFlower',
   color : 'black'
  },
});

AppRegistry.registerComponent('Signup',()=>Signup);
