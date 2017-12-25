import React,{Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Images} from '../R';

export default class SplashScreen extends Component{

  static navigationOptions={
    header:null
  }

  componentDidMount(){
    this.navigator = this.props.navigation;
    setTimeout(()=>{
      const actions = NavigationActions.reset({
        index:0,
        actions:[
          NavigationActions.navigate({routeName:'Login'})
        ]
      });
      this.navigator.dispatch(actions);
    },1000);
  }

  render(){
    /*<Image source={Images.background} style={styles.backgroundImage} />*/
    return(
      <View style={{flex:1}} >

        <View style={styles.container}>
          <Image source={Images.logo} style={{width:120, height:120}}/>
          <Text style={styles.title}>Confez</Text>
        </View>
        <Text style={styles.footer}>Fourth State Lab</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'stretch',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  title :{
   fontSize : 45,
   fontFamily : 'IndieFlower',
   color : 'black'
 },
 footer :{
   textAlign:'center',
   height:25,
   fontSize : 12,
   backgroundColor:'white'
 }
});

AppRegistry.registerComponent('SplashScreen',()=>SplashScreen);
