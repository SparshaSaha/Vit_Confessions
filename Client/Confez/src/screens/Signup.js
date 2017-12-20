import React,{Component} from 'react';
import {AppRegistry,StyleSheet,Text,View, Image, Dimensions, TouchableOpacity,ScrollView,Alert} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';
import {socket} from '../utils/socket.js';
import RoundedText from '../components/RoundedText';
import StepIndicator from '../components/StepIndicator';
import Swiper from 'react-native-swiper';
import * as R from '../R';


const isBlank=(str)=> {
  return (!str || /^\s*$/.test(str));
}
export default class Signup extends Component {

  constructor(props){
    super(props);
    this.state ={
      name : 'SsdcID',
      reg_no : '  ',
      email : 'srisdfdhadvsvrswain25@gmail.com',
      password : '123312',
      retype : '123312',
      username : "SPARSasdHS12314",
      width : null,
      height : null,
      currentPage : 1,
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
    if(this.state.currentPage==1){
      if(isBlank(this.state.reg_no)||isBlank(this.state.name)){
        Alert.alert('','Incomplete Data !');
      }
      else if(!(/[0-9][0-9][A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]/.test(this.state.reg_no))){
        Alert.alert('','Invalid Registration Number !')
      }
      else{
        this.refs.form.scrollTo({x:this.state.width,y:0,animated:true});
        this.setState({currentPage:2});
      }
    }
    else if(this.state.currentPage==2){
      if(isBlank(this.state.email)||isBlank(this.state.username)){
        Alert.alert('','Incomplete Data !');
      }
      else{
        this.refs.form.scrollTo({x:this.state.width*2,y:0,animated:true});
        this.setState({currentPage:3});
      }
    }
    else if(this.state.currentPage==3){
      if(isBlank(this.state.password)||isBlank(this.state.retype)){
        Alert.alert('','Incomplete Data !');
      }
      else if(this.state.password!=this.state.retype){
        Alert.alert('',"Password Doesn't Match");
      }
      else{
        this.refs.form.scrollTo({x:this.state.width*3,y:0,animated:true});
        this.setState({currentPage:4});
      }
    }
    else{
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
  }



  render(){
    const widthStyle = {width:this.state.width*0.85};
    const dynamicStyle =  StyleSheet.flatten([widthStyle,styles.inputView]);
    return(
      <ScrollView>
        <View style={[styles.container,{width : this.state.width,height :this.state.height*0.95}]}>
          <Image source={R.Images.logo} style={{width:100,height:100, marginTop:'10%'}}/>
          <Text style={styles.title}>Confez</Text>
          <StepIndicator current={this.state.currentPage} style={{marginTop:10}}/>

          <ScrollView
          ref='form'
          scrollEnabled={false}
          pagingEnabled={true}
          style={{marginBottom:20,marginTop:30}}
          horizontal={true}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}>
            <View style={{width : this.state.width,alignItems:'center'}}>
            <RoundedText imgSource ={Images.username}
            placeholder='Name'
            style={dynamicStyle}
            inputTextStyle={styles.inputTextStyle}
            onChangeText={(name)=>{this.setState({name})}}
            imageStyle = {styles.image}/>

            <RoundedText imgSource ={Images.hat}
            placeholder='Registration No.'
            style={dynamicStyle}
            inputTextStyle={styles.inputTextStyle}
            onChangeText={(reg_no)=>{this.setState({reg_no})}}
            imageStyle = {styles.image}
            autoCapitalize="characters"/>
            </View>

            <View style={{width : this.state.width,alignItems:'center'}}>

            <RoundedText imgSource ={Images.mail}
            placeholder='Email'
            style={dynamicStyle}
            inputTextStyle={styles.inputTextStyle}
            onChangeText={(email)=>{this.setState({email})}}
            imageStyle = {styles.image}/>

            <RoundedText imgSource ={Images.login}
            placeholder='Username'
            style={dynamicStyle}
            inputTextStyle={styles.inputTextStyle}
            onChangeText={(username)=>{this.setState({username})}}
            imageStyle = {styles.image} />

            </View>

            <View style={{width : this.state.width,alignItems:'center'}}>
            <RoundedText imgSource = {Images.key}
            placeholder='Password' secureTextEntry={true}
            style={dynamicStyle} inputTextStyle={styles.inputTextStyle}
            onChangeText={(password)=>{this.setState({password})}}
            imageStyle = {styles.image}/>


            <RoundedText imgSource = {Images.unlocked}
            placeholder='Retype Password' secureTextEntry={true}
            style={dynamicStyle} inputTextStyle={styles.inputTextStyle}
            onChangeText={(retype)=>{this.setState({retype})}}
            imageStyle = {styles.image}/>

            </View>
          </ScrollView>

          <RkButton rkType='rounded' onPress={this.onSignUpPress}
            style={{backgroundColor:Colors.primary,width:this.state.width*0.75, marginVertical:20}}>
              {(this.state.currentPage<4?'Continue':'Signup')}
          </RkButton>

          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginBottom :'20%'}}>
            <View style={{flexDirection:'row'}}>
              <Text>Already have an account? </Text>
              <Text style={{fontWeight:'bold'}}> Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems :'center',
  },
  inputView:{
    margin:10,
    paddingHorizontal:10
  },
  inputTextStyle:{
    fontSize:16,
    color:'black',
    marginTop:6,
  },
  title :{
   fontSize : 35,
   fontFamily : 'IndieFlower',
   color : 'black'
  },
  image:{
    width : 25,
    height :25,
  },
});

AppRegistry.registerComponent('Signup',()=>Signup);
